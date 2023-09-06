import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const BookMeeting = () => {
  const { t } = useTranslation();

  return (
    <Container
      fluid
      style={{ backgroundColor: "#EBBFF3", fontFamily: "primary-font" }}
    >
      <Row>
        <Col sm={10} md={10} xl={12}>
          <div
            className="d-flex align-items-center flex-column p-5"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            <h1 className="mb-5" style={{ fontSize: 50 }}>
              {t(
                "Have we convinced you in helping you bringing an exciting project implementation or update?"
              )}
            </h1>
            <p style={{ fontSize: 30, width: "90%" }}>
              {t(
                "If the answer is yes, then book an appointment with us and start planning the process of your project development!"
              )}
            </p>
            <Button
              href="/login"
              className="mt-4 px-4"
              style={{
                fontSize: 30,
                fontFamily: "primary-font",
                borderBottom: "4px solid black",
                borderRadius: 20,
                backgroundColor: "#7F7EC7",
              }}
            >
              {t("Book meeting")}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BookMeeting;
