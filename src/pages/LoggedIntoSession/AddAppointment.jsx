import React, { useState } from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import { Container, Button, Stack, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const AddAppointment = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [appointmentInput, setAppointmentInput] = useState({
    meeting_date: "",
    meeting_time: "",
    meeting_description: "",
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAppointmentInput((prevAppointmentInput) => ({
      ...prevAppointmentInput,
      [name]: value,
    }));
  };

  const handleAppointmentSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://the-other-nuub-backend-583b88d181b4.herokuapp.com/add_meeting.php",
        new URLSearchParams({
          meeting_date: appointmentInput.meeting_date,
          meeting_time: appointmentInput.meeting_time,
          meeting_description: appointmentInput.meeting_description,
        }),
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data) {
          navigate("/appointmentconfirm");
          setErrorMessage("");
        } else {
          setErrorMessage("Appointment submitting failed");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "You must choose a date"
        ) {
          setErrorMessage("You must choose a date");
        } else if (
          error.response &&
          error.response.data === "You must choose a time"
        ) {
          setErrorMessage("You must choose a time");
        } else if (
          error.response &&
          error.response.data === "Meetings are not available on weekends"
        ) {
          setErrorMessage("Meetings are not available on weekends");
        } else if (
          error.response &&
          error.response.data ===
            "Meetings are available between 10 AM and 3 PM"
        ) {
          setErrorMessage("Meetings are available between 10 AM and 3 PM");
        } else if (
          error.response &&
          error.response.data === "This section must be filled in"
        ) {
          setErrorMessage("This section must be filled in");
        } else if (
          error.response &&
          error.response.data === "Only 550 characters allowed"
        ) {
          setErrorMessage("Only 550 characters allowed");
        } else if (
          error.response &&
          error.response.data === "At least 100 characters are required"
        ) {
          setErrorMessage("At least 100 characters are required");
        }
      });
  };

  return (
    <>
      <LoggedInNavigation />
      <Container>
        <h1 style={{ marginTop: "5rem", textAlign: "center", fontSize: 50 }}>
          {t("Book meeting")}
        </h1>
        <p className="mb-4 mt-4 mx-4 px-5" style={{ fontSize: 30 }}>
          {t(
            "Please choose the desired date and time and describe your future project you would like to work on it with us"
          )}
        </p>
        <Row>
          <Col sm={2} md={12} lg={12}>
            <Form
              onSubmit={handleAppointmentSubmit}
              className="px-5 my-4 px-5 d-flex justify-content-center flex-column"
              style={{
                fontSize: 25,
                fontFamily: "primary-font",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              <p
                style={{
                  color: "red",
                  fontSize: 30,
                  fontFamily: "secondary-font",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {t(errorMessage)}
              </p>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="date"
                  name="meeting_date"
                  value={appointmentInput.meeting_date}
                  onChange={handleChangeInput}
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    fontSize: 25,
                    borderRadius: 20,
                    borderBottom: "3px solid grey",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="time"
                  name="meeting_time"
                  value={appointmentInput.meeting_time}
                  onChange={handleChangeInput}
                  style={{
                    marginBottom: "0.5rem",
                    padding: "1rem",
                    fontSize: 25,
                    borderRadius: 20,
                    borderBottom: "3px solid grey",
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  as="textarea"
                  name="meeting_description"
                  value={appointmentInput.meeting_description}
                  onChange={handleChangeInput}
                  rows={4}
                  placeholder={t("Describe your upcoming project here...")}
                  style={{
                    padding: "1rem 3rem 3rem 1.5rem",
                    fontSize: 25,
                    fontFamily: "secondary-font",
                    borderRadius: 20,
                    borderBottom: "4px solid grey",
                  }}
                />
              </Form.Group>
              <Stack
                direction="horizontal"
                gap={5}
                className="d-flex justify-content-center"
              >
                <Button
                  className="mt-4 px-4"
                  style={{
                    fontSize: 30,
                    fontFamily: "primary-font",
                    borderBottom: "4px solid black",
                    borderRadius: 20,
                    backgroundColor: "#7F7EC7",
                    marginBottom: "2rem",
                  }}
                  onClick={handleAppointmentSubmit}
                >
                  {t("Confirm")}
                </Button>
              </Stack>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddAppointment;
