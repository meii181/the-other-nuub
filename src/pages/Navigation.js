import React from "react";
import { Nav, Navbar, Stack, Button } from "react-bootstrap";
import nuub_logo from "../assets/img/cropped-nuub_logo.png";

const Navigation = () => {
  return (
    <Navbar className="navigation pt-3" expand="lg">
      <Navbar.Brand href="#" className="logo">
        <img src={nuub_logo} width="246px" height="83px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Stack direction="horizontal" gap={3} className="ms-auto">
          <Nav
            className="nav justify-content-end me-5"
            style={{ fontSize: 24, fontWeight: "bold" }}
          >
            <Nav.Link href="#services" className="me-4">
              Services
            </Nav.Link>
            <Nav.Link href="#strategy" className="me-4">
              Strategy
            </Nav.Link>
            <Nav.Link href="#casesclients" className="me-4">
              Cases&Clients
            </Nav.Link>
            <Nav.Link href="#about-us" className="me-4">
              About Us
            </Nav.Link>
            <Nav.Link href="#contact-and-support" className="me-4">
              Contact and Support
            </Nav.Link>
          </Nav>
        </Stack>
        <Nav className="language me-5">
          <Button
            href="#english"
            className="me-3 px-4"
            style={{ fontSize: 20 }}
            variant="info"
            active
          >
            EN
          </Button>{" "}
          <Button
            href="#danish"
            className="ms-2 px-4"
            style={{ fontSize: 20 }}
            variant="info"
            disabled
          >
            DA
          </Button>{" "}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
