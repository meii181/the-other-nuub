import React, { useState, useEffect } from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, Row, Col, Stack, Button } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

const EditAppointment = () => {
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState({
    meeting_date: "",
    meeting_time: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { search } = useLocation();

  const params = new URLSearchParams(search);
  const meeting_id = params.get("meeting_id");

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("https://the-other-nuub-backend-583b88d181b4.herokuapp.com/get_user.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          navigate("/editappointment");
        } else {
          navigate("/login");
        }
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`https://the-other-nuub-backend-583b88d181b4.herokuapp.com/check_meetings.php?meeting_id=${meeting_id}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setAppointment(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meeting_id]);

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAppointment((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `https://the-other-nuub-backend-583b88d181b4.herokuapp.com/update_meeting.php?meeting_id=${meeting_id}`,
        new URLSearchParams({
          meeting_date: appointment.meeting_date,
          meeting_time: appointment.meeting_time,
        }),

        { withCredentials: true }
      )
      .then((response) => {
        if (response.data) {
          navigate(`/updatedappointmentconfirm?meeting_id=${meeting_id}`);
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
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <LoggedInNavigation />
      <Container>
        <Row>
          <Col sm={2} md={12} lg={12}>
            <h1
              className="mt-2"
              style={{
                textAlign: "center",
                fontSize: 50,
              }}
            >
              {t("Change appointment")}
            </h1>
            <Form
              className="px-5 my-5 px-5"
              style={{
                fontSize: 25,
                fontFamily: "primary-font",
                marginLeft: "1rem",
                marginRight: "1rem",
              }}
            >
              <Stack
                direction="horizontal"
                gap={4}
                className="d-flex justify-content-center mb-3"
              >
                <Form.Group>
                  <Form.Control
                    size="lg"
                    type="date"
                    name="meeting_date"
                    value={appointment.meeting_date}
                    onChange={handleChangeInput}
                    style={{
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
                    value={appointment.meeting_time}
                    onChange={handleChangeInput}
                    style={{
                      padding: "1rem",
                      fontSize: 25,
                      borderRadius: 20,
                      borderBottom: "3px solid grey",
                    }}
                  />
                </Form.Group>
              </Stack>

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
                    marginBottom: "0.5rem",
                  }}
                  onClick={() => handleUpdateSubmit}
                >
                  {t("Confirm")}
                </Button>
              </Stack>
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
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditAppointment;
