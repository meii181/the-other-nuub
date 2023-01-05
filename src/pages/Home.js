import React from "react";
import { Button, Container, Stack } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ArrowRightCircle } from "react-bootstrap-icons";

const Home = () => {
  return (
    <section id="home" className="justify-content-md-center mt-5 pt-5">
      <Container>
        <Row>
          <Col xs lg={8}>
            <h1
              className="title"
              style={{ fontSize: 55, position: "relative" }}
            >
              Your delivered expectations at just one click away
            </h1>
            <p className="subtitle w-75 pt-2 pb-3" style={{ fontSize: 25 }}>
              Calculate your services, whether you need a new website or an
              update, and we will deliver the product based on your needs and
              expectations.
            </p>

            <Stack
              direction="horizontal"
              gap={4}
              className="call-to-action mt-5"
            >
              <Button
                href="#pricecalculator"
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  backgroundColor: "#7F7EC7",
                  color: "whitesmoke",
                  borderBottom: "4px solid black",
                }}
                className="px-3 py-2"
              >
                Get Started!
              </Button>{" "}
              <a
                href="#contact-and-support"
                className="pt-2"
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  textDecoration: "none",
                  color: "black",
                }}
              >
                or get in touch with us{" "}
                <ArrowRightCircle size={25} className="ms-2" />
              </a>
            </Stack>
          </Col>

          <Col xs lg={3} className="xs pt-5 lg mx-5">
            <div
              className="circle mt-4"
              style={{
                width: 390,
                height: 390,
                backgroundColor: "#F9E95D",
                borderRadius: "50%",
                top: 150,
                right: 330,
                position: "absolute",
                zIndex: -1,
              }}
            ></div>
            <div
              className="circle_2 mt-4"
              style={{
                width: 220,
                height: 220,
                backgroundColor: "#7F7EC7",
                borderRadius: "50%",
                top: 400,
                right: 250,
                position: "absolute",
              }}
            ></div>
            <div
              className="circle_3 mt-4"
              style={{
                width: 90,
                height: 90,
                backgroundColor: "#EBBFF3",
                borderRadius: "50%",
                top: 580,
                right: 500,
                position: "absolute",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
