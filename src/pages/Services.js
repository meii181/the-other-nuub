import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import {
  Shop,
  GraphUpArrow,
  FileEarmarkCode,
  HouseGear,
  DatabaseGear,
} from "react-bootstrap-icons";

const Services = () => {
  return (
    <section
      id="services"
      style={{
        marginTop: "15rem",
        paddingLeft: "7rem",
        paddingRight: "7rem",
        fontFamily: "secondary-font",
      }}
    >
      <Container>
        <div
          style={{
            width: 1578,
            height: 650,
            left: 0,
            top: 1350,
            position: "absolute",
            backgroundColor: "#7F7EC7",
          }}
        ></div>
        <div className="title-subtitle" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 55, fontFamily: "primary-font" }}>
            Our services
          </h1>
          <p style={{ fontSize: 25 }} className="pt-2">
            We do offer all types of services for all types of our clients’
            needs and preferences, from helping you with the marketing and
            search engine optimization, to integrating your website to work with
            other software
          </p>
        </div>

        <Row
          className="g-5 mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginLeft: "3rem",
          }}
        >
          <Col md={4}>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
                width: "20rem",
              }}
            >
              <Card.Body className="my-5" style={{ textAlign: "center" }}>
                <GraphUpArrow size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  Marketing
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  Having your website seen on the user's search results or
                  through social media means something crucial when it comes to
                  promoting your own content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
                width: "20rem",
                textAlign: "center",
              }}
            >
              <Card.Body className="service-1 my-5">
                <FileEarmarkCode size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  Integration
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  You can opt for additional software to your web solution,
                  whether it is a newsletter, chat bot, or inventory systems,
                  depending on your needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
                width: "20rem",
              }}
            >
              <Card.Body className="my-5" style={{ textAlign: "center" }}>
                <HouseGear size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  Homepage
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  If you are looking to have your own website, to promote your
                  portfolio to the larger audience for example, you are in the
                  right place.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
                width: "20rem",
              }}
            >
              <Card.Body className="my-4" style={{ textAlign: "center" }}>
                <Shop size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  Webshop
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  Providing websites to the clients that would like to open a
                  business, together with the E-commerce services.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
                width: "20rem",
              }}
            >
              <Card.Body className="my-4" style={{ textAlign: "center" }}>
                <DatabaseGear size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  Drift
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  Regardless you need a new website or an update to it, the
                  website solution always requires to be in a great technical
                  shape.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;
