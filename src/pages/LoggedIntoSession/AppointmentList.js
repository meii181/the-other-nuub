import React, { useEffect, useState } from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import {
  Row,
  Col,
  Container,
  Button,
  Table,
  Stack,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost/api/get_user.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          navigate("/appointmentlist");
        } else {
          navigate("/login");
        }
      });
  }, [navigate]);

  useEffect(() => {
    axios
      .get("http://localhost/api/check_meetings.php", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data) {
          setAppointments(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteSubmit = (meeting_id) => {
    axios
      .delete(
        `http://localhost/api/cancel_meeting.php?meeting_id=${meeting_id}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data) {
          navigate(`/cancelledappointmentconfirm?meeting_id=${meeting_id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateClick = (appointments) => {
    setSelectedAppointment(appointments);
    setShowUpdateForm(true);
  };

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAppointments((prevAppointments) => ({
      ...prevAppointments,
      [name]: value,
    }));
  };

  const handleAppointmentSubmit = (event, meeting_id) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost/api/update_meeting.php?meeting_id=${meeting_id}`,
        new URLSearchParams({
          meeting_date: appointments.meeting_date,
          meeting_time: appointments.meeting_time,
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
      {Array.isArray(appointments) && appointments.length > 0 ? (
        <Container>
          <h1
            className="mb-5"
            style={{ fontSize: 50, marginTop: "3rem", textAlign: "center" }}
          >
            Your meetings
          </h1>
          <Table
            responsive="sm"
            striped
            bordered
            hover
            style={{
              borderBottom: "4px solid grey",
            }}
          >
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>{t("Meeting ID")}</th>
                <th>{t("Meeting Date")}</th>
                <th>{t("Meeting Time")}</th>
                <th>{t("Meeting Description")}</th>
                <th>{t("Action")}</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointments) => (
                <tr key={appointments.meeting_id}>
                  <td>{appointments.meeting_id}</td>
                  <td>{appointments.meeting_date}</td>
                  <td>{appointments.meeting_time}</td>
                  <td>{appointments.meeting_description}</td>
                  <td>
                    <Stack
                      className="d-flex justify-content-center p-3"
                      gap={1}
                    >
                      <Button
                        className="mt-2 px-4"
                        style={{
                          fontSize: 20,
                          fontFamily: "primary-font",
                          borderBottom: "4px solid black",
                          borderRadius: 20,
                          backgroundColor: "#7F7EC7",
                        }}
                        onClick={() => handleUpdateClick(appointments)}
                      >
                        {t("Edit")}
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteSubmit(appointments.meeting_id)
                        }
                        className="my-3 px-4"
                        style={{
                          fontSize: 20,
                          fontFamily: "primary-font",
                          borderBottom: "4px solid black",
                          borderRadius: 20,
                          backgroundColor: "#EB3131",
                        }}
                      >
                        {t("Cancel")}
                      </Button>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Button
              href="/addappointment"
              className="mt-4 px-4 mb-5"
              style={{
                fontSize: 30,
                fontFamily: "primary-font",
                borderBottom: "4px solid black",
                borderRadius: 20,
                backgroundColor: "#7F7EC7",
              }}
            >
              {t("Book a new meeting")}
            </Button>
          </div>
          {showUpdateForm && selectedAppointment && (
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
                        value={appointments.meeting_date}
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
                        value={appointments.meeting_time}
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
                      onClick={() =>
                        handleAppointmentSubmit(appointments.meeting_id)
                      }
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
          )}
        </Container>
      ) : (
        <Container>
          <Row>
            <Col sm={5} md={10} xl={12}>
              <div
                className="d-flex align-items-center flex-column p-5"
                style={{ textAlign: "center", marginTop: "5rem" }}
              >
                <h1 className="mb-5" style={{ fontSize: 50 }}>
                  {t("Whoops, there's nothing here.")}
                </h1>
                <p style={{ fontSize: 30, width: "90%" }}>
                  {t(
                    "Would you like to book a meeting with us to discuss your project?"
                  )}
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
                  {t("Book a new meeting")}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AppointmentList;
