import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import {
  Shop,
  GraphUpArrow,
  FileEarmarkCode,
  HouseGear,
  DatabaseGear,
} from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
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
            {t("Our services")}
          </h1>
          <p style={{ fontSize: 25 }} className="pt-2">
            {t(
              "We do offer all types of services for all types of our clients' needs and preferences, from helping you with creating the website, to integrating it to work with other software and search engine optimization"
            )}
          </p>
        </div>

        <Row
          xs={1}
          md={2}
          xl={4}
          className="g-5 mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginLeft: "3rem",
          }}
        >
          <Col>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
              }}
            >
              <Card.Body className="my-5" style={{ textAlign: "center" }}>
                <GraphUpArrow size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  {t("Marketing")}
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  {t(
                    "Having your website seen on the user's search results or through social media means something crucial when it comes to promoting your own content."
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",

                textAlign: "center",
              }}
            >
              <Card.Body className="service-1 my-5">
                <FileEarmarkCode size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  {t("Integration")}
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  {t(
                    "You can opt for additional software to your web solution,whether it is a newsletter, chat bot, or inventory systems, depending on your needs."
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
              }}
            >
              <Card.Body className="my-5" style={{ textAlign: "center" }}>
                <HouseGear size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  {t("Homepage")}
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  {t(
                    "If you are looking to have your own website, to promote your portfolio to the larger audience for example, you are in the right place."
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
              }}
            >
              <Card.Body className="my-4" style={{ textAlign: "center" }}>
                <Shop size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  {t("Webshop")}
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  {t(
                    "Providing websites to the clients that would like to open a business, together with the E-commerce services."
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              variant="light"
              style={{
                borderTop: "4px solid black",
                borderRadius: 0,
                padding: "0 2rem",
              }}
            >
              <Card.Body className="my-4" style={{ textAlign: "center" }}>
                <DatabaseGear size={50} className="mb-3" />
                <Card.Title
                  style={{ fontSize: 35, fontFamily: "primary-font" }}
                >
                  {t("Drift")}
                </Card.Title>
                <Card.Text
                  className="mt-3"
                  style={{ fontSize: 20, textAlign: "start" }}
                >
                  {t(
                    "Regardless you need a new website or an update to it, the website solution always requires to be in a great technical shape."
                  )}
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
