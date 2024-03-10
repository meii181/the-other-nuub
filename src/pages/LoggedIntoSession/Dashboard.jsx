import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedInNavigation from "./LoggedInNavigation";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {

    axios
      .get("https://the-other-nuub-backend-583b88d181b4.herokuapp.com/get_user.php", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          navigate("/dashboard");
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
    <h1>Hi there</h1>
      <LoggedInNavigation />
      <Container>
        <Row>
          <Col sm={5} md={10} xl={12}>
            <div
              className="d-flex align-items-center flex-column p-5"
              style={{ textAlign: "center", marginTop: "5rem" }}
            >
              <h1 className="mb-5" style={{ fontSize: 50 }}>
                {t("Welcome to your Nuub dashboard,")} {user.first_name}
              </h1>
              <p style={{ fontSize: 30, width: "90%" }}>
                {t(
                  "Here you can update your creditentials, create a new meeting with us and manage your appointment :D ."
                )}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
