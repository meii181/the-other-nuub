import React from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const CancelledAppointmentConfirmation = () => {
  const { t } = useTranslation();

  return (
    <>
      <LoggedInNavigation />
      <Container>
        <Row>
          <Col sm={5} md={10} xl={12}>
            <div
              className="d-flex align-items-center flex-column p-5"
              style={{ textAlign: "center", marginTop: "5rem" }}
            >
              <h1 className="mb-5" style={{ fontSize: 50 }}>
                {t("Your meeting has been cancelled")}
              </h1>
              <p style={{ fontSize: 30, width: "90%" }}>
                An email with the cancelling confirmation has been sent to you.
              </p>
              <Button
                href="/addappointment"
                className="mt-4 px-4"
                style={{
                  fontSize: 30,
                  fontFamily: "primary-font",
                  borderBottom: "4px solid black",
                  borderRadius: 20,
                  backgroundColor: "#7F7EC7",
                }}
              >
                {t("Reschedule appointment")}
              </Button>

              <Button
                href="/appointmentlist"
                className="mt-4 px-4"
                style={{
                  fontSize: 30,
                  fontFamily: "primary-font",
                  borderBottom: "4px solid black",
                  borderRadius: 20,
                  backgroundColor: "#7F7EC7",
                }}
              >
                {t("Go back to my appointments")}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CancelledAppointmentConfirmation;
