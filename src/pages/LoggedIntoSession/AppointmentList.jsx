import React, { useEffect, useState } from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import { Row, Col, Container, Button, Table, Stack } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AppointmentList = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("https://the-other-nuub-backend-583b88d181b4.herokuapp.com/get_user.php", {
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
      .get("https://the-other-nuub-backend-583b88d181b4.herokuapp.com/check_meetings.php", {
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
        `https://the-other-nuub-backend-583b88d181b4.herokuapp.com/cancel_meeting.php?meeting_id=${meeting_id}`,
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
              {appointments.map((appointment) => (
                <tr key={appointment.meeting_id}>
                  <td>{appointment.meeting_id}</td>
                  <td>{appointment.meeting_date}</td>
                  <td>{appointment.meeting_time}</td>
                  <td>{appointment.meeting_description}</td>
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
                        onClick={() =>
                          navigate(
                            `/editappointment?meeting_id=${appointment.meeting_id}`
                          )
                        }
                      >
                        {t("Edit")}
                      </Button>
                      <Button
                        onClick={() =>
                          handleDeleteSubmit(appointment.meeting_id)
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
