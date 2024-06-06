import React, { useEffect, useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import Navigation from "../components/Navigation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function MyPageAdd() {
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

  async function addFlorist() {
    const imageReference = ref(storage, `images/${image.name}`);
    const response = await uploadBytes(imageReference, image);
    const imageUrl = await getDownloadURL(response.ref);
    await addDoc(collection(db, "florists"), { catalog, caption, image: imageUrl, imageName, comment });
    navigate("/");
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [loading, user, navigate]);

  return (
    <>
      <Navigation />
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Florist</h1>
        <Form>
        <Form.Group className="mb-3" controlId="catalog">
          <Form.Label>Catalog</Form.Label>
          <Form.Select
            value={catalog}
            onChange={(e) => setCatalog(e.target.value)}
          >
            <option value="">Select Catalog</option>
            <option value="Baby Gift">Baby Gift</option>
            <option value="Bridal">Bridal</option>
            <option value="Chinese New Year">Chinese New Year</option>
            <option value="Christmas">Christmas</option>
            <option value="Graduation">Graduation</option>
            <option value="Wedding">Wedding</option>
            <option value="Other">Other</option>
          </Form.Select>
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

          <Button variant="primary" onClick={async (e) => addFlorist()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
