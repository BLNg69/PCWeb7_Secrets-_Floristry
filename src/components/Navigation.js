import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Navigation() {
  const isHomePage = window.location.pathname === '/';
  return (
    <Navbar variant="dark" bg="dark">
      <Container>
      <Navbar.Brand href="/">Secret Floristry</Navbar.Brand>
        <Nav>
          <Nav.Link href="/add">New Florist</Nav.Link>
          {isHomePage ? null : <Nav.Link onClick={(e) => signOut(auth)}>Sign Out</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
}