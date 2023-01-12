import React from "react";
import { Container, Carousel, Row, Col } from "react-bootstrap";
import ordrupgaard from "../assets/img/ordrupgaard.jpg";
import ropox from "../assets/img/ropox.jpg";
import lyngby from "../assets/img/lyngby.jpg";
import plum from "../assets/img/plum.jpg";
import hjertesikker from "../assets/img/hjertesikker.jpg";
import proselection from "../assets/img/proselection.jpg";
import absalon from "../assets/img/absalon.jpg";
import danskRad from "../assets/img/dansk-rad.png";
import pg from "../assets/img/p&g.png";
import kiro from "../assets/img/logo-kiro.png";
import danskBeredskaber from "../assets/img/db-logo.png";
import ole from "../assets/img/logo.png";
import kentAndreasen from "../assets/img/kent-andreasen.png";
import { useTranslation } from "react-i18next";

const CasesClients = () => {
  const { t } = useTranslation();

  return (
    <section id="casesclients">
      <Container
        className="container-cases"
        fluid
        style={{
          backgroundColor: "#FF629A",
          fontFamily: "primary-font",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 55 }}>{t("Our cases")}</h1>
        <Carousel
          style={{
            marginTop: "5rem",
          }}
        >
          <Carousel.Item>
            <img src={ordrupgaard} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Ordrupgaard
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Webshop")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={ropox} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Ropox
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Homepage/Webshop system")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={absalon} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Absalon
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Homepage")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={proselection} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Pro Selection
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Integration/Homepage")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={hjertesikker} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                HjerteSikker
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Homepage")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={lyngby} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Lyngby Porcelain
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Warehouse management integration")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={plum} className="w-50" />
            <Carousel.Caption>
              <div className="banner-text"></div>
              <h2
                style={{
                  marginTop: "1.5rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 50,
                  position: "relative",
                  textDecoration: "underline",
                }}
              >
                Plum
              </h2>
              <p
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 35,
                  fontFamily: "secondary-font",
                  position: "relative",
                }}
              >
                {t("Homepage/Webshop system")}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <h1
          style={{
            fontSize: 55,
            marginTop: "10rem",
          }}
        >
          {t("Our clients")}
        </h1>
        <Row
          style={{
            marginTop: "6rem",
            paddingLeft: "5rem",
            paddingRight: "7rem",
          }}
        >
          <Col
            md={4}
            style={{
              marginTop: "1rem",
            }}
          >
            <img src={danskRad} className="w-50" />
          </Col>
          <Col md={4}>
            <img src={pg} className="w-25" />
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "2rem",
            }}
          >
            <img src={kiro} className="w-50" />
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "5rem",
            }}
          >
            <img src={danskBeredskaber} className="w-25" />
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "8.5rem",
            }}
          >
            <img src={ole} className="w-75" />
          </Col>

          <Col
            md={4}
            style={{
              marginTop: "7.5rem",
            }}
          >
            <img src={kentAndreasen} className="w-50" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CasesClients;
