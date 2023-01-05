import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <section id="about-us">
      <Container
        fluid
        style={{
          paddingTop: "5rem",
          backgroundColor: "#EBBFF3",
          width: 1577,
          height: 1300,
          textAlign: "center",
          fontFamily: "primary-font",
        }}
      >
        <h1 style={{ fontSize: 55 }}>Designers.Developers.Nuubs.</h1>
        <p
          style={{
            fontSize: 25,
            width: "70%",
            marginTop: "2rem",
            marginLeft: "13rem",
            fontFamily: "secondary-font",
          }}
        >
          This is us. Everyday, we are proud of our profession, training and
          experience behind us, always ready to deliver the best of your
          product!
        </p>
        <Row
          className="g-4"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            marginLeft: "12rem",
          }}
        >
          <Col lg={5}>
            <div
              style={{
                width: 270,
                height: 270,
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
              }}
            ></div>
            <div
              style={{
                textAlign: "center",
                marginRight: "17rem",
                marginTop: "1rem",
              }}
            >
              <h1 style={{ fontSize: 45 }}>Kristian Lerche</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                Founder of Nuub
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div
              style={{
                width: 270,
                height: 270,
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
              }}
            />
            <div
              style={{
                textAlign: "center",
                marginRight: "17rem",
                marginTop: "1rem",
              }}
            >
              <h1 style={{ fontSize: 45 }}>Philip Marlow</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                Senior Web Designer & Project Management
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div
              style={{
                width: 270,
                height: 270,
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
                marginTop: "3rem",
              }}
            />
            <div
              style={{
                textAlign: "center",
                marginRight: "17rem",
                marginTop: "1rem",
              }}
            >
              <h1 style={{ fontSize: 45 }}>Betina Svedsen</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                Web and Graphic Designer
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div
              style={{
                width: 270,
                height: 270,
                borderRadius: "50%",
                backgroundColor: "whitesmoke",
                marginTop: "3rem",
              }}
            />
            <div
              style={{
                textAlign: "center",
                marginRight: "17rem",
                marginTop: "1rem",
              }}
            >
              <h1 style={{ fontSize: 45 }}>Iga Naskręt</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                Web Developer
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
