import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about-us">
      <Container
        className="container-about"
        fluid
        style={{
          backgroundColor: "#EBBFF3",
          fontFamily: "primary-font",
        }}
      >
        <h1 style={{ fontSize: 55 }}>Designers.Developers.Nuubs.</h1>
        <p className="p-about">
          {t(
            "This is us, everyday, we are a group of dedicated people in the web domain who always put the professionalism on the first place, equipped with solid knowledge, training and experience, and proud of our profession, always ready to deliver the best of your product!"
          )}
        </p>

        <Row
          className="g-5 justify-content-center"
          style={{
            marginTop: "4rem",
            marginLeft: "4rem",
          }}
        >
          <Col sm={12} md={7} lg={5} xxl={3}>
            <div className="circle-staff">
              <PersonFill size={200} className="mt-4"></PersonFill>
            </div>
            <div className="about-staff">
              <h1 style={{ fontSize: 45 }}>Kristian Lerche</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                {t("Owner of Nuub")}
              </p>
            </div>
          </Col>
          <Col sm={12} md={7} lg={5} xxl={3}>
            <div className="circle-staff">
              <PersonFill size={200} className="mt-4"></PersonFill>
            </div>
            <div className="about-staff">
              <h1 style={{ fontSize: 45 }}>Philip Marlow</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                {t("Senior Web Designer & Project Management")}
              </p>
            </div>
          </Col>
          <Col sm={12} md={7} lg={5} xxl={3}>
            <div className="circle-staff">
              <PersonFill size={200} className="mt-4"></PersonFill>
            </div>
            <div className="about-staff">
              <h1 style={{ fontSize: 45 }}>Betina Svedsen</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                {t("Web and Graphic Designer")}
              </p>
            </div>
          </Col>
          <Col sm={12} md={7} lg={5} xxl={3}>
            <div className="circle-staff">
              <PersonFill size={200} className="mt-4"></PersonFill>
            </div>
            <div className="about-staff">
              <h1 style={{ fontSize: 45 }}>Iga Naskręt</h1>
              <p style={{ fontSize: 25, fontFamily: "secondary-font" }}>
                {t("Web Developer")}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
