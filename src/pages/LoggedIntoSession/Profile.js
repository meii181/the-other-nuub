import React, { useState, useEffect } from "react";
import LoggedInNavigation from "./LoggedInNavigation";
import { Row, Col, Container, Button } from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost/api/get_user.php", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user = response.data;
          setUser(user);
          navigate("/profile");
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [navigate]);

  return (
    <>
      <LoggedInNavigation />
      <Container>
        <Row>
          <Col sm={12} md={10} lg={12}>
            <div className="user mt-5 d-flex align-items-center flex-column">
              <div
                style={{
                  backgroundColor: "#F1F1F1",
                  borderRadius: 100,
                  width: 200,
                  height: 200,
                }}
              >
                <PersonFill size={152} className="mt-4 ms-4" />
              </div>
              <h1 className="mt-4" style={{ fontSize: 60 }}>
                {user.first_name} {user.last_name}
              </h1>
            </div>
            <div className="user-section d-flex align-items-center flex-column m-4">
              <h2>{t("First Name")}</h2>
              <p style={{ fontSize: 25, marginBottom: "2rem" }}>
                {user.first_name}
              </p>

              <h2>{t("Last Name")}</h2>
              <p style={{ fontSize: 25, marginBottom: "2rem" }}>
                {user.last_name}
              </p>

              <h2>{t("Company")}</h2>
              <p style={{ fontSize: 25, marginBottom: "2rem" }}>
                {user.company}
              </p>

              <h2>{t("Email address")}</h2>
              <p style={{ fontSize: 25, marginBottom: "2rem" }}>{user.email}</p>

              <h2>{t("Phone number")}</h2>
              <p style={{ fontSize: 25, marginBottom: "0.5rem" }}>
                {user.phone_number}
              </p>

              <Button
                href="/updateprofile"
                className="update_profile px-3 py-2 mt-4"
                style={{
                  backgroundColor: "#7F7EC7",
                  borderBottom: "3px solid black",
                  fontSize: 30,
                  fontFamily: "primary-font",
                  fontWeight: "bold",
                  borderRadius: 20,
                }}
              >
                {t("Update Profile")}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
