import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Strategy = () => {
  const { t } = useTranslation();

  return (
    <section id="strategy">
      <Container
        fluid
        style={{
          paddingTop: "7rem",
          fontFamily: "primary-font",
          backgroundColor: "#F9E95D",
          width: 1577,
          height: 750,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 55 }}>{t("Our strategy")}</h1>
          <p
            style={{
              fontSize: 25,
              width: "60%",
              marginTop: "2rem",
              marginLeft: "18rem",
              fontFamily: "secondary-font",
            }}
          >
            {t(
              "Even if you are in need of a new website or an update to the existent one, our approach will always be the same."
            )}
          </p>
          <p
            style={{
              fontSize: 25,
              width: "60%",
              marginTop: "2rem",
              marginLeft: "18rem",
              fontFamily: "secondary-font",
            }}
          >
            {t(
              "During the process, we keep in mind four types of strategies, from planning and developing the product, to our one goal, and that is delivering the final product, with the ensurance that your website will also grow in number of visitors."
            )}
          </p>
        </div>
        <Row
          className="g-1"
          style={{
            marginTop: "4rem",
            marginLeft: "11rem",
          }}
        >
          <Col md={3}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#2D2828",
              }}
            ></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Planning")}
            </h2>
          </Col>

          <Col md={3}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#2D2828",
              }}
            ></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Development")}
            </h2>
          </Col>

          <Col md={3}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#2D2828",
              }}
            ></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Delivery")}
            </h2>
          </Col>

          <Col md={3}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: "#2D2828",
              }}
            ></div>
            <h2 className="mt-4" style={{ fontSize: 35 }}>
              {t("Growth")}
            </h2>
          </Col>
        </Row>

        <div
          style={{
            border: "0.5px solid black",
            width: 1577,
            left: 0,
            position: "absolute",
            marginTop: "3rem",
          }}
        ></div>
      </Container>
    </section>
  );
};

export default Strategy;
