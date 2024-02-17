import React from "react";
import { Nav, Navbar, Stack } from "react-bootstrap";
import nuub_logo from "../assets/img/cropped-nuub_logo.png";
import { useTranslation } from "react-i18next";
import LanguageBar from "./LanguageBar";

const Navigation = () => {
  const { t } = useTranslation();

  return (
    <Navbar className="navigation pt-3" expand="lg">
      <Navbar.Brand className="logo">
        <img src={nuub_logo} width="246px" height="83px" alt="logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Stack direction="horizontal" gap={3} className="ms-auto">
          <Nav
            className="nav justify-content-end me-auto"
            style={{ fontSize: 24, fontWeight: "bold" }}
          >
            <Nav.Link href="#services" className="me-4">
              {t("Services")}
            </Nav.Link>
            <Nav.Link href="#strategy" className="me-4">
              {t("Strategy")}
            </Nav.Link>
            <Nav.Link href="#casesclients" className="me-4">
              {t("Cases&Clients")}
            </Nav.Link>
            <Nav.Link href="#contact-and-support" className="me-4">
              {t("Contact and Support")}
            </Nav.Link>
            <Nav.Link
              href="/login"
              className="me-5 py-2 px-4"
              style={{
                borderRadius: 50,
                backgroundColor: "#FF629A",
                color: "whitesmoke",
                fontWeight: "bold",
              }}
            >
              {t("Book Meeting")}
            </Nav.Link>
          </Nav>
          <LanguageBar />
        </Stack>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
