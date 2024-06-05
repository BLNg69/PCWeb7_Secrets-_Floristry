import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import Navigation from "../components/Navigation";
import { ref, deleteObject } from "firebase/storage";

export default function MyPageDetails() {
  const [catalog, setCatalog] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deleteFlorist(id) {
    // delete from storage
    const floristDocument = await getDoc(doc(db, "florists", id));
    const florist = floristDocument.data();
    const desertRef = ref(storage, `images/${florist.imageName}`);
    deleteObject(desertRef).then(() => {
      console.log("deleted from firebase storage");
    }).catch((error) => {
      console.error(error.message);
    });

    await deleteDoc(doc(db, "florists", id));
    navigate("/");
  }

  async function getFlorist(id) {
    const floristDocument = await getDoc(doc(db, "florists", id));
    const florist = floristDocument.data();
    setCatalog(florist.catalog);
    setCaption(florist.caption);
    setImage(florist.image);
    setComment(florist.comment)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getFlorist(id);
  }, [id, navigate, user, loading]);

  return (
    <>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>CONFIRM DELETE</h1>
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <Image src={image} style={{ width: "100%" }} />
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{catalog} / {caption}</Card.Title>
                <Card.Text>{comment}</Card.Text>
                <Card.Link
                  onClick={() => deleteFlorist(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
