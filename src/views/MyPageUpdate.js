import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Navigation from "../components/Navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function MyPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [catalog, setCatalog] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(
    "https://zca.sg/img/placeholder"
  );
  const [imageName, setImageName] = useState("");

  async function updateFlorist() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await updateDoc(doc(db, "florists", id), { catalog, caption, image: imageUrl, imageName, comment });
    navigate("/florist/" + id); //send back to the details page
  }

  async function getFlorist(id) {
    const floristDocument = await getDoc(doc(db, "florists", id));
    const florist = floristDocument.data();
    setCatalog(florist.catalog);
    setCaption(florist.caption);
    setImage(florist.image);
    setPreviewImage(florist.image);
    setComment(florist.comment);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getFlorist(id);
  }, [id, navigate, user, loading]);

  return (
    <div>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Edit Florist</h1>
        <Form>
          <Form.Group className="mb-3" controlId="catalog">
            <Form.Label>Catalog</Form.Label>
            <Form.Control
              type="text"
              placeholder="CNY"
              value={catalog}
              onChange={(text) => setCatalog(text.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="My Creation"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>

          <Image
            src={previewImage}
            style={{
              display:"block",
              objectFit: "cover",
              width: "10rem",
              height: "10rem",
            }}
          />

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                const previewImage = URL.createObjectURL(imageFile);
                setImage(imageFile);
                setPreviewImage(previewImage);
                setImageName(imageFile.name);
              }}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              placeholder="This florist created in Jan 2024."
              value={comment}
              onChange={(text) => setComment(text.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={(e) => updateFlorist()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
