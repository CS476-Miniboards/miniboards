import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Miniboards</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Games</Nav.Link>
          <Nav.Link href="/boards">Boards</Nav.Link>
          <Nav.Link href="/dashboard">Profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
