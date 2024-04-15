import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";

const AuthenticationNav = () => {
  return (
    <>
      <Navbar
        className="navbar navbar-light pt-4"
        expand="lg"
        style={{ position: "absolute", left: "95%" }}
      >
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Nav className="nav" style={{ fontSize: 24, fontWeight: "bold" }}>
          <Nav.Link href="/" className="me-4">
            <XLg size={45}></XLg>
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default AuthenticationNav;
