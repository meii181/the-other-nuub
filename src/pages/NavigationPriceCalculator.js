import React from "react";
import { Navbar, Stack, Nav } from "react-bootstrap";
import nuub_logo from "../assets/img/cropped-nuub_logo.png";
import { XLg } from "react-bootstrap-icons";

const NavigationPriceCalculator = () => {
    return (
      <Navbar className="navigation pt-3" expand="lg">
        <Navbar.Brand className="logo">
          <img src={nuub_logo} width="246px" height="83px" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Stack direction="horizontal" gap={3} className="ms-auto">
            <Nav
              className="nav justify-content-end me-5"
              style={{ fontSize: 24, fontWeight: "bold" }}
            >
              <Nav.Link href="/" className="me-4">
               <XLg size={40}></XLg>
              </Nav.Link>
              </Nav>
              </Stack>
              </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationPriceCalculator;