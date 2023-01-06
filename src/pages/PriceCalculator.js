import React from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import { HouseFill, Cart4 } from "react-bootstrap-icons";
import NavigationPriceCalculator from "./NavigationPriceCalculator";

const PriceCalculator = () => {
  //   const questions = [
  //     {
  //       text: "What kind of website would you like?",
  //       subtitle:
  //         "Choose where would you like to display your information, either on a home page, or on an online tranding platform.",
  //       options: [
  //         { id: 0, text: "Homepage" },
  //         { id: 1, text: "Webpage" },
  //       ],
  //     },
  //   ];

  return (
    <div>
      <NavigationPriceCalculator />
      <Container
        fluid
        style={{
          marginTop: "1rem",
          borderBottom: "5px solid black",
          borderTop: "5px solid black",
          height: 540,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 40,
              paddingTop: "3rem",
              textAlign: "center",
              paddingBottom: "2rem",
              fontFamily: "primary-font",
            }}
          >
            What kind of website would you like?
          </h1>
          <p
            style={{
              textAlign: "center",
              fontFamily: "secondary-font",
              fontSize: 25,
            }}
          >
            Choose where would you like to display your information, either on a
            home page, or on an online tranding platform.
          </p>
        </div>

        <Row
          className="g-4 mt-1"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginLeft: "4rem",
          }}
        >
          <Col md={4}>
            <Card
              style={{
                borderBottom: "5px solid black",
                borderRadius: 0,
                width: "20rem",
                height: "17.5rem",
                backgroundColor: "#F9E95D",
              }}
            >
              <Card.Body
                href="/price-calculator-1"
                className="mt-5"
                style={{ textAlign: "center" }}
              >
                <HouseFill size={80} />
                <Card.Title
                  style={{
                    fontSize: 37,
                    fontFamily: "primary-font",
                    marginTop: "2rem",
                  }}
                >
                  Homepage
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              style={{
                borderBottom: "5px solid black",
                borderRadius: 0,
                width: "20rem",
                height: "17.5rem",
                textAlign: "center",
                backgroundColor: "#F9E95D",
              }}
            >
              <Card.Body href="/price-calculator-2" className="mt-5">
                <Cart4 size={80} />
                <Card.Title
                  style={{
                    fontSize: 37,
                    fontFamily: "primary-font",
                    marginTop: "2rem",
                  }}
                >
                  Webshop
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PriceCalculator;
