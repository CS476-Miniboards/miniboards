import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import GameList from "../View Components/GameList";
import { Link } from "react-router-dom";
import { useAuth } from "../Models/auth/AuthContext";

export default function Header() {
  const { currentUser } = useAuth();
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav.Link as={Link} to="/">
          <Navbar.Brand>Miniboards</Navbar.Brand>
        </Nav.Link>
        <Nav className="me-auto">
          <NavDropdown title="Games" id="gamesDropdown">
            <GameList type="game" />
          </NavDropdown>
          <NavDropdown title="Boards" id="gamesDropdown">
            <GameList type="board" />
          </NavDropdown>
          <Nav.Link as={Link} to="/dashboard">
            Profile
          </Nav.Link>
        </Nav>
        {currentUser ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{currentUser.email}</a>
            </Navbar.Text>
          </Navbar.Collapse>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
}
