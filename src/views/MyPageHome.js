import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../components/Navigation";

export default function MyPageHome() {
  const [floristsGrouped, setFloristsGrouped] = useState({});

  async function getAllFlorists() {
    const query = await getDocs(collection(db, "florists"));
    const florists = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    const groupedFlorists = florists.reduce((acc, florist) => {
      const catalog = florist.catalog;
      if (!acc[catalog]) {
        acc[catalog] = [];
      }
      acc[catalog].push(florist);
      return acc;
    }, {});

    setFloristsGrouped(groupedFlorists);
  }

  useEffect(() => {
    getAllFlorists();
  }, []);

  const renderImages = (catalog) => {
    return floristsGrouped[catalog].map((florist, index) => (
      <ImageSquare key={index} florist={florist} />
    ));
  };

  return (
    <>
      <Navigation />
      <Container>
        {Object.keys(floristsGrouped).map((catalog, index) => (
          <div key={index} style={{ marginBottom: "2rem" }}> 
            <h2>{catalog}</h2>
            <Row>{renderImages(catalog)}</Row>
          </div>
        ))}
      </Container>
    </>
  );
}

function ImageSquare({ florist }) {
  const { image, id } = florist;
  return (
    <Link
      to={`florist/${id}`}
      style={{
        width: "18rem",
        marginLeft: "1rem",
        marginTop: "2rem",
      }}
    >
      <Image
        src={image}
        style={{
          objectFit: "cover",
          width: "18rem",
          height: "18rem",
        }}
      />
    </Link>
  );
}
