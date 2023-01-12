import React, { useEffect, useState } from "react";
import { Nav, Navbar, Stack, Button } from "react-bootstrap";
import nuub_logo from "../assets/img/cropped-nuub_logo.png";
import { useTranslation } from "react-i18next";

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState(false);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lng", lng);
    setState(!state);
  };

  useEffect(() => {
    const lang = localStorage.getItem("input");
    if (lang) {
      setState(JSON.parse(lang));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("input", JSON.stringify(state));
  });

  return (
    <Navbar className="navigation pt-3" expand="lg">
      <Navbar.Brand className="logo">
        <img src={nuub_logo} width="246px" height="83px" />
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
            <Nav.Link href="#about-us" className="me-4">
              {t("About Us")}
            </Nav.Link>
            <Nav.Link href="#contact-and-support" className="me-4">
              {t("Contact and Support")}
            </Nav.Link>
          </Nav>
        </Stack>
        <Nav className="language me-5">
          {state ? (
            <Button
              className="me-3 px-4"
              style={{ fontSize: 20 }}
              variant="info"
              active
              onClick={() => handleChangeLanguage("en")}
            >
              {" "}
              EN{" "}
            </Button>
          ) : (
            <Button
              className="me-3 px-4"
              style={{ fontSize: 20 }}
              variant="info"
              disabled
              onClick={() => handleChangeLanguage("en")}
            >
              {" "}
              EN{" "}
            </Button>
          )}
          {state ? (
            <Button
              className="me-3 px-4"
              style={{ fontSize: 20 }}
              variant="info"
              disabled
              onClick={() => handleChangeLanguage("da")}
            >
              {" "}
              DA{" "}
            </Button>
          ) : (
            <Button
              className="me-3 px-4"
              style={{ fontSize: 20 }}
              variant="info"
              active
              onClick={() => handleChangeLanguage("da")}
            >
              {" "}
              DA{" "}
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
