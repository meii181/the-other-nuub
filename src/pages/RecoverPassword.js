import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthenticationNav from "./AuthenticationNav";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const RecoverPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState({
    password: "",
    confirm_password: "",
  });

  const [password_key, setPasswordKey] = useState("");
  const { search } = useLocation();
  const navigate = useNavigate();

// retrieve the key
useEffect(() => {
    const params = new URLSearchParams(search);
    const key = params.get("password_key");
    setPasswordKey(key);

}, [search]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

  const handleLogInSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        `http://localhost/api/reset_password.php?password_key=${password_key}`,
        new URLSearchParams({
          password: userInput.password,
          confirm_password: userInput.confirm_password
        })
      )

      .then((response) => {
        if (
          response.data
        ) {
          navigate("/passwordchange");
          setErrorMessage("");
        } else {
          setErrorMessage(response.data);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "Please type your password"
        ) {
          setErrorMessage("Please type your password");
        } else if (
            error.response &&
            error.response.data === "Please confirm your password"
          ) {
            setErrorMessage("Please confirm your password");

        } else if (
          error.response &&
          error.response.data === "The key is missing"
        ) {
          setErrorMessage("The key is missing");
        } else if (
          error.response &&
          error.response.data === "The key does not contain 32 characaters"
        ) {
          setErrorMessage("The key does not contain 32 characaters");
        } else if (
          error.response &&
          error.response.data === "The password do not match"
        ) {
          setErrorMessage("The password do not match");
        } else if (
          error.response &&
          error.response.data === "The password must be at least 8 characters"
        ) {
          setErrorMessage("The password must be at least 8 characters");
        } else if (
            error.response &&
            error.response.data === "The password cannot be longer than 15 characters"
          ) {
            setErrorMessage("The password cannot be longer than 15 characters");
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

          <Col sm={12} md={12} lg={7}>
            <div
              className="text"
              style={{ textAlign: "center", marginTop: "10rem" }}
            >
              <h1 className="mb-2 p-4" style={{ fontSize: 55 }}>
                Recover your password
              </h1>
              <p className="mb-4" style={{ fontSize: 30 }}>
                Introduce your new password and you are ready to go
              </p>
            </div>
           <Form
              onSubmit={handleLogInSubmit}
              className="py-4 px-5 d-flex align-items-center flex-column"
              style={{ fontSize: 25, fontFamily: "primary-font" }}
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="New password"
                  value={userInput.password}
                  onChange={handleChange}
                  autoComplete="off"
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
                  placeholder="Confirm new password"
                  value={userInput.confirm_password}
                  onChange={handleChange}
                  autoComplete="off"
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
                Submit
              </Button>

              <p
                style={{
                  color: "red",
                  fontSize: 25,
                  fontFamily: "secondary-font",
                  fontWeight: "bold",
                }}
              >
                {errorMessage}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecoverPassword;
