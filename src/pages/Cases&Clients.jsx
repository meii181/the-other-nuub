import React from "react";
import { Container, Carousel, Row, Col, Image } from "react-bootstrap";
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
            <img src={ordrupgaard} width="60%" height="auto" alt="ordrupgaard"/>
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
            <img src={ropox} width="60%" height="auto" alt="ropox"/>
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
            <img src={absalon} width="60%" height="auto" alt="absalon"/>
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
            <img src={proselection} width="60%" height="auto" alt="proselection"/>
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
            <img src={hjertesikker} width="60%" height="auto" alt="hjertesikker"/>
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
            <Image src={lyngby} width="60%" height="auto" alt="lyngby"/>
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
            <img src={plum} width="60%" height="auto" alt="plum"/>
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
            <img src={danskRad} width="50%" height="auto" alt="danskRad"/>
          </Col>
          <Col md={4}>
            <img src={pg} width="30%" height="auto" alt="PG"/>
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "2rem",
            }}
          >
            <img src={kiro} width="50%" height="auto" alt="kiro"/>
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "5rem",
            }}
          >
            <img src={danskBeredskaber} width="30%" height="auto" alt="danskBeredskaber"/>
          </Col>
          <Col
            md={4}
            style={{
              marginTop: "8.5rem",
            }}
          >
            <img src={ole} width="70%" height="auto" alt="ole"/>
          </Col>

          <Col
            md={4}
            style={{
              marginTop: "7.5rem",
            }}
          >
            <img src={kentAndreasen} width="50%" height="auto" alt="kentAndreasen"/>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CasesClients;
