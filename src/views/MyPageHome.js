import { useEffect, useState } from "react";
import { Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Navigation from "../components/Navigation";

export default function MyPageHome() {
  const [florists, setFlorists] = useState([]);

   async function getAllFlorists() {
    const query = await getDocs(collection(db, "florists"));
    const florists = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setFlorists(florists);
  }

  useEffect(() => {
    getAllFlorists();
  }, []);

  const ImagesRow = () => {
    return florists.map((florist, index) => <ImageSquare key={index} florist={florist} />);
  };

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <ImagesRow />
        </Row>
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
