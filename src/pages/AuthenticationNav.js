import React from 'react';
import { Nav, Navbar, Stack } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";

const AuthenticationNav = () => {
  return (
    <Navbar className="navbar navbar-light pt-3" expand="lg" style={{position: "absolute", left: 1500}}>
        <Navbar.Toggle aria-controls="navbar-nav" />
          <Stack direction="horizontal" gap={3} className="ms-auto">
            <Nav
              className="nav justify-content-end me-5"
              style={{ fontSize: 24, fontWeight: "bold" }}
            >
              <Nav.Link href="/" className="me-4">
               <XLg size={45}></XLg>
              </Nav.Link>
              </Nav>
              </Stack>
    </Navbar>

  )
}

export default AuthenticationNav;