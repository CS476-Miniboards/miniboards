import React, {useEffect} from "react";
import { NavDropdown } from "react-bootstrap";

export default function GameList({type}) {

  return (
    <> 
    {/* Temporary, we will get the values from the database and map these to games or boards based on the type */}
      <NavDropdown.Item link="/">Game</NavDropdown.Item>
      <NavDropdown.Item link="/">Another Game</NavDropdown.Item>
    </>
  );
}
