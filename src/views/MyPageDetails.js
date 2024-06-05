import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Navigation from "../components/Navigation";

export default function MyPageDetails() {
  const [catalog, setCatalog] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");
  const params = useParams();
  const id = params.id;
 
  async function getFlorist(id) {
    const floristDocument = await getDoc(doc(db, "florists", id));
    const florist = floristDocument.data();
    setCatalog(florist.catalog);
    setCaption(florist.caption);
    setImage(florist.image);
    setComment(florist.comment)
  }

  useEffect(() => {
     getFlorist(id);
  }, [id]);

  return (
    <>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Florist Details</h1>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{catalog} / {caption}</Card.Title>
                <Card.Text>{comment}</Card.Text>
                <Card.Link href={`/update/${id}`}>Edit</Card.Link>
                <Card.Link href={`/floristdelete/${id}`}>Delete</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
