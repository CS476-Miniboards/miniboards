import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import GameList from "../View Components/GameList";
import { Link } from "react-router-dom";
import { useAuth } from "../Models/auth/AuthContext";
import { useAdmin } from "../Models/admin/AdminContext";

export default function Header() {
  const { currentUser } = useAuth();
  const { isAdmin } = useAdmin();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    setDisplayName(currentUser?.displayName);
  }, [currentUser?.displayName]);

  return (
    <Navbar collapseOnSelect expand="xl" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Toggle />
        <Nav.Link as={Link} to="/">
          <Navbar.Brand>Miniboards</Navbar.Brand>
        </Nav.Link>
        <Navbar.Collapse>
          <Nav className="me-auto">
            <NavDropdown title="Games" id="gamesDropdown">
              <GameList type="game" />
            </NavDropdown>
            <NavDropdown title="Boards" id="boardsDropdown">
              <GameList type="board" />
            </NavDropdown>
            {isAdmin() && (
              <NavDropdown title="Admin Functions" id="adminDropdown">
                <NavDropdown.Item
                  eventKey="collapse"
                  as={Link}
                  to="/admin"
                  active={false}
                >
                  Admin List
                </NavDropdown.Item>
                <NavDropdown.Item
                  eventKey="collapse"
                  as={Link}
                  to="/errors"
                  active={false}
                >
                  Error Reports
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          {currentUser && (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as:&nbsp;</Navbar.Text>
              <Link style={{ color: "var(--bs-navbar-color)" }} to="/dashboard">
                {displayName}
              </Link>
            </Navbar.Collapse>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
