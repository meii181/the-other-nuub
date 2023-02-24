import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import nuub_logo_white from "../assets/img/cropped-nuub_logo white.png";
import { Facebook, Instagram, Linkedin } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Container className="container-footer" fluid>
        <Row>
          <Col sm={12} md={4} xxl={5} style={{ marginTop: "8rem" }}>
            <img
              src={nuub_logo_white}
              width="80%"
              height="auto"
              className="ms-5"
              alt="logo"
            />
            <h2
              style={{
                color: "whitesmoke",
                fontSize: 30,
                marginTop: "3rem",
                marginLeft: "2rem",
              }}
            >
              {t("Web Design and Integration")}
            </h2>
          </Col>
          <Col>
            <div
              style={{
                height: 420,
                borderLeft: "3px solid whitesmoke",
                position: "absolute",
                marginLeft: "8rem",
              }}
            ></div>
          </Col>
          <Col
            sm={12}
            md={4}
            xxl={5}
            style={{
              marginTop: "6rem",
              marginRight: "3rem",
            }}
          >
            <h2>Herstedvang 7C, 1. sal 2620 Albertslund</h2>
            <h2 style={{ marginTop: "1rem" }}>CVR: 35528970</h2>
            <h2 style={{ marginTop: "3rem" }}>Tlf. 43 45 43 44</h2>
            <h2 style={{ marginTop: "1rem" }}>support@nuub.dk</h2>
            <a href="https://www.facebook.com/nuub.dk">
              <Facebook
                size={40}
                className="mt-4"
                style={{
                  marginRight: "3rem",
                  color: "white",
                }}
              />
            </a>
            <a href="https://www.instagram.com/nuub.dk/">
              <Instagram
                size={40}
                className="mt-4"
                style={{ color: "white" }}
              />
            </a>
            <a href="https://www.linkedin.com/company/nuub-cph/">
              <Linkedin
                size={40}
                className="mt-4"
                style={{
                  marginLeft: "3rem",
                  color: "white",
                }}
              />
            </a>
          </Col>
        </Row>
        <p className="copyright">@2022 Nuub</p>
      </Container>
    </>
  );
};

export default Footer;
