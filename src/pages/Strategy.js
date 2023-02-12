import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Strategy = () => {
  const { t } = useTranslation();

  return (
    <section id="strategy">
      <Container
        className="container-strategy"
        fluid
        style={{
          fontFamily: "primary-font",
          backgroundColor: "#F9E95D",
        }}
      >
        <Row>
          <Col sm={12} md={10} xl={7} style={{margin: "0 auto"}}>
        <div className="strategy-section" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 55 }}>{t("Our strategy")}</h1>
          <p className="p-strategy">
            {t(
              "Even if you are in need of a new website or an update to the existent one, our approach will always be the same."
            )}
          </p>
          <p className="p-strategy">
            {t(
              "During the process, we keep in mind four types of strategies, from planning and developing the product, to our one goal, and that is delivering the final product, with the ensurance that your website will also grow in number of visitors."
            )}
          </p>
        </div>
        </Col>
        </Row>
        <Row
          className="g-2"
          style={{
            marginTop: "7rem",
          }}
        >
          <Col md={3} xl={3}>
            <div className="circle-strategy"></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Planning")}
            </h2>
          </Col>

          <Col md={3} xl={3}>
            <div className="circle-strategy"></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Development")}
            </h2>
          </Col>

          <Col md={3} xl={3}>
            <div className="circle-strategy"></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Delivery")}
            </h2>
          </Col>

          <Col md={3} xl={3}>
            <div className="circle-strategy"></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Growth")}
            </h2>
          </Col>
        </Row>

        <div className="stick"></div>
      </Container>
    </section>
  );
};

export default Strategy;
