import React, { useState } from "react";
import { NavDropdown } from "react-bootstrap";

export default function GameList() {
  return (
    <>
      <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
      <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
    </>
  );
}
