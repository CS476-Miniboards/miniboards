import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import GameList from "./GameList";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Miniboards</Navbar.Brand>
        <Nav className="me-auto">
          <NavDropdown title="Games" id="gamesDropdown">
            <GameList type="Game"/>
          </NavDropdown>
          <NavDropdown title="Boards" id="gamesDropdown">
            <GameList type="Board"/>
          </NavDropdown>
          <Nav.Link href="/dashboard">Profile</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
