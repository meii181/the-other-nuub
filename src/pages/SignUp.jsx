import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationNav from "./AuthenticationNav";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  const { t } = useTranslation();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://the-other-nuub-backend-583b88d181b4.herokuapp.com/signup.php",
        new URLSearchParams({
          first_name: userInput.first_name,
          last_name: userInput.last_name,
          company: userInput.company,
          email: userInput.email,
          phone_number: userInput.phone_number,
          password: userInput.password,
          confirm_password: userInput.confirm_password,
        })
      )
      .then((response) => {
        if (
          response.data ===
          "A verification link has been sent to your email address."
        ) {
          setSuccessMessage(
            "A verification link has been sent to your email address."
          );
          setErrorMessage("");
        } else {
          setErrorMessage("Couldn't sign you up");
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "All fields must be filled in"
        ) {
          setErrorMessage("All fields must be filled in");
        } else if (
          error.response &&
          error.response.data ===
            "The first name must be longer than 2 characters"
        ) {
          setErrorMessage("The first name must be longer than 2 characters");
        } else if (
          error.response &&
          error.response.data ===
            "The first name cannot be longer than 25 characters"
        ) {
          setErrorMessage("The first name cannot be longer than 25 characters");
        } else if (
          error.response &&
          error.response.data ===
            "The last name must be longer than 2 characters"
        ) {
          setErrorMessage("The last name must be longer than 2 characters");
        } else if (
          error.response &&
          error.response.data ===
            "The last name cannot be longer than 25 characters"
        ) {
          setErrorMessage("The last name cannot be longer than 25 characters");
        } else if (
          error.response &&
          error.response.data === "The email is not valid"
        ) {
          setErrorMessage("The email is not valid");
        } else if (
          error.response &&
          error.response.data ===
            "The password is not strong enough, it must be at least 8 characters"
        ) {
          setErrorMessage(
            "The password is not strong enough, it must be at least 8 characters"
          );
        } else if (
          error.response &&
          error.response.data ===
            "The password has exceeded the maximum of 30 characters"
        ) {
          setErrorMessage(
            "The password has exceeded the maximum of 30 characters"
          );
        } else if (
          error.response &&
          error.response.data === "Danish phone number must be provided"
        ) {
          setErrorMessage("Danish phone number must be provided");
        } else if (
          error.response &&
          error.response.data === "The passwords does not match"
        ) {
          setErrorMessage("The passwords does not match");
        } else if (
          error.response &&
          error.response.data === "The email has already been registered"
        ) {
          setErrorMessage("The email has already been registered");
        } else if (
          error.response &&
          error.response.data === "The phone number has already been registered"
        ) {
          setErrorMessage("The phone number has already been registered");
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
            sm={12}
            md={12}
            lg={5}
            style={{ backgroundColor: "#F9E95D", height: "130vh" }}
          ></Col>

          <Col sm={12} md={12} lg={6} style={{ fontFamily: "primary-font" }}>
            <div
              className="text"
              style={{ textAlign: "center", marginTop: "2rem" }}
            >
              <h1 className="mb-1 p-4" style={{ fontSize: 55 }}>
                {t("Sign Up")}
              </h1>
              <p className="mb-4" style={{ fontSize: 30 }}>
                {t(
                  "Introduce your credentials in order to register an account"
                )}
              </p>
            </div>
            <Form
              onSubmit={handleSignUpSubmit}
              className="py-4 px-5 d-flex align-items-center flex-column"
              style={{ fontSize: 25 }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="first_name"
                  name="first_name"
                  placeholder={t("First Name")}
                  value={userInput.first_name}
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="last_name"
                  name="last_name"
                  placeholder={t("Last Name")}
                  value={userInput.last_name}
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="company"
                  name="company"
                  placeholder={t("Company")}
                  value={userInput.company}
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="phone_number"
                  name="phone_number"
                  placeholder={t("Phone Number")}
                  value={userInput.phone_number}
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder={t("Password")}
                  value={userInput.password}
                  autoComplete="off"
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

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="confirm_password"
                  placeholder={t("Confirm Password")}
                  value={userInput.confirm_password}
                  autoComplete="off"
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
                name="Submit"
                value="Submit Form"
                className="mt-3 mb-5 px-4"
                style={{
                  fontSize: 30,
                  fontFamily: "primary-font",
                  borderBottom: "4px solid black",
                  borderRadius: 20,
                  backgroundColor: "#7F7EC7",
                }}
              >
                {t("Register")}
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
                {t("Already have an account? Log in")}{" "}
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

export default SignUp;
