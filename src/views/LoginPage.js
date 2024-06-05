import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Navigation from "../components/Navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFirebaseError = (message) => {
    if (message.includes("auth/invalid-credential")) {
      setError("Invalid Credential.");
    } else if (message.includes("auth/email-already-in-use")) {
      setError("The email address is already in use by another account.");
    } else if (message.includes("auth/invalid-email")) {
      setError("The email address is badly formatted.");
    } else if (message.includes("auth/operation-not-allowed")) {
      setError("Email/password accounts are not enabled.");
    } else if (message.includes("auth/weak-password")) {
      setError("Password should be at least 6 characters.");
    } else if (message.includes("auth/internal-error")) {
      setError("An internal error has occurred.");
    } else if (message.includes("auth/network-request-failed")) {
      setError("A network error has occurred. Please try again.");
    } else if (message.includes("auth/too-many-requests")) {
      setError("Too many requests. Try again later.");
    } else if (message.includes("auth/invalid-api-key")) {
      setError("Your API key is invalid.");
    } else if (message.includes("auth/app-deleted")) {
      setError("This instance of FirebaseApp has been deleted.");
    } else if (message.includes("auth/invalid-user-token")) {
      setError(
        "The user's credential is no longer valid. Please sign in again."
      );
    } else if (message.includes("auth/user-token-expired")) {
      setError("The user's credential has expired. Please sign in again.");
    } else if (message.includes("auth/web-storage-unsupported")) {
      setError(
        "This browser is not supported or 3rd party cookies and data may be disabled."
      );
    } else {
      setError("An unknown error occurred.");
    }
  };

  return (
    <>
    <Navigation />
    <Container>
      <h1 className="my-3">Login to your account</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="/signup">Sign up for an account</a>
        </Form.Group>
        <Button variant="primary" onClick={async (e) => {
          setError("");
          const canLogin = username && password;
          if (canLogin) {
            try {
             await signInWithEmailAndPassword(auth, username, password);
             navigate("/");
            } catch (error) {
              handleFirebaseError(error.message);
            }
          }
        }}>
          Login
        </Button>
      </Form>
      <p>{error}</p>
    </Container>
    </>
  );
}
