import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationNav from "./AuthenticationNav";
import { useTranslation } from "react-i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

    const handleLogInSubmit = (event) => {
      event.preventDefault();
      
      axios
      .post(
        "https://the-other-nuub-backend-583b88d181b4.herokuapp.com/login.php",
        new URLSearchParams({
          email: userInput.email,
          password: userInput.password,
        }),
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data) {
          navigate("/dashboard");
        } else {
          setErrorMessage("Unable to log in, try again later");
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
          error.response.data === "The email is not valid"
        ) {
          setErrorMessage("The email is not valid");
        } else if (
          error.response &&
          error.response.data ===
            "The password is not strong, it must be at least 8 characters"
        ) {
          setErrorMessage(
            "The password is not strong, it must be at least 8 characters"
          );
        } else if (
          error.response &&
          error.response.data ===
            "The password has reached the maximum of 30 characters"
        ) {
          setErrorMessage(
            "The password has reached the maximum of 30 characters"
          );
        } else if (
          error.response &&
          error.response.data === "Wrong email or password"
        ) {
          setErrorMessage("Wrong email or password");
        } else if (
          error.response &&
          error.response.data ===
            "Unable to login, you must verify your account first"
        ) {
          setErrorMessage(
            "Unable to login, you must verify your account first"
          );
        } else if (
          error.response &&
          error.response.data === "User does not exist"
        ) {
          setErrorMessage("User does not exist");
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
            style={{ backgroundColor: "#FF629A", height: "100vh" }}
          ></Col>

          <Col sm={12} md={12} lg={6}>
            <div
              className="text"
              style={{ textAlign: "center", marginTop: "7rem" }}
            >
              <h1 className="mb-2 p-4" style={{ fontSize: 55 }}>
                {t("Log In")}
              </h1>
              <p className="mb-4" style={{ fontSize: 30 }}>
                {t("Introduce your credentials in order to log in the portal")}
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
                {t("Log in")}
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

              <p>
                {t("Not registered yet? Sign up")}{" "}
                <a
                  href="/signup"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {t("here!")}
                </a>
              </p>

              <p>
                {t("Forgot your password? Recover it")}{" "}
                <a
                  href="/forgotpassword"
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

export default Login;
