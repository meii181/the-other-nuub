import React, { useState } from "react";
import axios from "axios";
import AuthenticationNav from "./AuthenticationNav";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userInput, setUserInput] = useState({
    email: "",
  });

  const { t } = useTranslation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost/api/forgot_password.php",
        new URLSearchParams({
          email: userInput.email,
        }),
        { withCredentials: true }
      )

      .then((response) => {
        if (
          response.data ===
          "The link with password recovery has been sent to your email address."
        ) {
          setSuccessMessage(
            "The link with password recovery has been sent to your email address."
          );
          setErrorMessage("");
        } else {
          setErrorMessage(response.data);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "This field must be filled in"
        ) {
          setErrorMessage("This field must be filled in");
        } else if (
          error.response &&
          error.response.data === "The email is not valid"
        ) {
          setErrorMessage("The email is not valid");
        } else if (
          error.response &&
          error.response.data === "The key could not be found"
        ) {
          setErrorMessage("The key could not be found");
        } else if (
          error.response &&
          error.response.data === "The key does not contain 32 characters"
        ) {
          setErrorMessage("The key does not contain 32 characters");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <>
      <AuthenticationNav />
      <Container fluid>
        <Row>
          <Col
            sm={2}
            md={3}
            lg={5}
            style={{ backgroundColor: "#FF629A", height: "100vh" }}
          ></Col>

          <Col sm={12} md={12} lg={7}>
            <div
              className="text"
              style={{ textAlign: "center", marginTop: "10rem" }}
            >
              <h1 className="mb-2 p-4" style={{ fontSize: 55 }}>
                {t("Forgot your password?")}
              </h1>
              <p
                className="mb-4"
                style={{
                  fontSize: 30,
                  paddingLeft: "2rem",
                  paddingRight: "3rem",
                }}
              >
                {t(
                  "Introduce the email you signed up with in order to recover your password"
                )}
              </p>
            </div>
            <Form
              onSubmit={handleLogInSubmit}
              className="py-4 px-5 d-flex align-items-center flex-column"
              style={{ fontSize: 25, fontFamily: "primary-font" }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={t("Email")}
                  value={userInput.email}
                  onChange={handleChange}
                  style={{
                    height: "2.7rem",
                    marginBottom: "1rem",
                    padding: "1.5rem",
                    fontSize: 25,
                    borderRadius: 20,
                    borderBottom: "3px solid grey",
                  }}
                />
              </Form.Group>

              <Button
                type="submit"
                name="submit"
                className="mt-3 mb-5 px-4"
                style={{
                  fontSize: 25,
                  borderBottom: "4px solid black",
                  borderRadius: 20,
                  backgroundColor: "#7F7EC7",
                }}
              >
                Send
              </Button>

              <p
                style={{
                  color: "red",
                  fontSize: 25,
                  fontFamily: "secondary-font",
                  fontWeight: "bold",
                }}
              >
                {t(errorMessage)}
              </p>

              <p
                style={{
                  color: "green",
                  fontSize: 25,
                  fontFamily: "secondary-font",
                  fontWeight: "bold",
                }}
              >
                {t(successMessage)}
              </p>
              <p>
                {t("Get back to login")}{" "}
                <a
                  href="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {t("here!")}
                </a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
