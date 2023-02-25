import React from 'react';
import LoggedInNavigation from "./LoggedInNavigation";
import {Row, Col, Container, Button, Stack} from "react-bootstrap";

//axios.post coming soon for "Yes" button

const CancelAppointment = () => {
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
              Are you sure you want to cancel the meeting?
              </h1>
              <p style={{ fontSize: 30, width: "90%" }}>
              In case you reconsider, you can reschedule the meeting anytime.
              </p>
              <Stack gap={4} direction="horizontal" className="d-flex justify-content-center">
              <Button href="/cancelledappointmentconfirm"
                  className="mt-4 px-4"
                  style={{
                    fontSize: 30,
                    fontFamily: "primary-font",
                    borderBottom: "4px solid black",
                    borderRadius: 20,
                    backgroundColor: "#EB3131",
                  }}>Yes</Button>

                  <Button href="/appointmentlist"
                  className="mt-4 px-4"
                  style={{
                    fontSize: 30,
                    fontFamily: "primary-font",
                    borderBottom: "4px solid black",
                    borderRadius: 20,
                    backgroundColor: "#7F7EC7",
                  }}>No, take me back</Button>
                  </Stack>

            </div>
          </Col>
        </Row>
        </Container>
    </>
  )
}

export default CancelAppointment