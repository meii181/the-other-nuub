import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import LoggedInNavigation from "./LoggedInNavigation";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);

  function validateEmail() {
    const emailRegex =
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
    return emailRegex.test(email);
  }

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    const update_user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      password: password,
      confirm_password: confirm_password,
    };

    axios
      .post("http://localhost/api/update_profile.php", update_user)
      .then((response) => {
        if (response.data) {
          setSuccessMessage("Your profile has been updated successfully!");
        } else {
          setErrorMessage(response.data);
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
            "The first name cannot be longer than 12 characters"
        ) {
          setErrorMessage("The first name cannot be longer than 12 characters");
        } else if (
          error.response &&
          error.response.data ===
            "The last name must be longer than 2 characters"
        ) {
          setErrorMessage("The last name must be longer than 2 characters");
        } else if (
          error.response &&
          error.response.data ===
            "The last name cannot be longer than 2 characters"
        ) {
          setErrorMessage("The last name cannot be longer than 2 characters");
        } else if (
          error.response &&
          error.response.data === "The email is not valid" &&
          !validateEmail()
        ) {
          setErrorMessage("The email is not valid");
        } else if (
          error.response &&
          error.response.data === "The password is not strong enough"
        ) {
          setErrorMessage("The password is not strong enough");
        } else if (
          error.response &&
          error.response.data ===
            "The password has exceeded the maximum of characters"
        ) {
          setErrorMessage(
            "The password has exceeded the maximum of characters"
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
          error.response.data === "The email is already taken"
        ) {
          setErrorMessage("The email is already taken");
        } else if (
          error.response &&
          error.response.data === "Failed updating your profile"
        ) {
          setErrorMessage("Failed updating your profile");
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
          <Col sm={12} md={10} lg={12}>
            <div
              className="form d-flex align-items-center flex-column"
              style={{ marginTop: "4rem" }}
            >
              <h1 style={{ fontSize: 60 }}>Edit your creditentials</h1>
              <p style={{ fontSize: 25 }}>
                Write down your following creditentials you wish to change
              </p>
              {user && (
                <Form
                  onSubmit={handleUpdateFormSubmit}
                  className="py-4 px-5 d-flex align-items-center flex-column"
                  style={{ fontFamily: "primary-font" }}
                >
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      name="first_name"
                      placeholder="Your first name"
                      value={first_name}
                      onChange={(event) => setFirstName(event.target.value)}
                      style={{
                        height: "3rem",
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
                      type="text"
                      name="last_name"
                      placeholder="Your last name"
                      value={last_name}
                      onChange={(event) => setLastName(event.target.value)}
                      style={{
                        height: "3rem",
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
                      placeholder="Your email"
                      value={email}
                      autoComplete="off"
                      onChange={(event) => setEmail(event.target.value)}
                      style={{
                        height: "3rem",
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
                      type="text"
                      name="phone_number"
                      placeholder="Your phone number"
                      value={phone_number}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      style={{
                        height: "3rem",
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
                      placeholder="Your password"
                      autoComplete="off"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      style={{
                        height: "3rem",
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
                      placeholder="Confirm changed password"
                      autoComplete="off"
                      value={confirm_password}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      style={{
                        height: "3rem",
                        marginBottom: "1rem",
                        padding: "1.5rem",
                        fontSize: 25,
                        borderRadius: 20,
                        borderBottom: "3px solid grey",
                      }}
                    />
                  </Form.Group>

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
                  <p
                    style={{
                      color: "green",
                      fontSize: 25,
                      fontFamily: "secondary-font",
                      fontWeight: "bold",
                    }}
                  >
                    {successMessage}
                  </p>

                  <Button
                    type="submit"
                    className="mt-2 px-4"
                    style={{
                      fontSize: 25,
                      borderBottom: "4px solid black",
                      borderRadius: 20,
                      backgroundColor: "#7F7EC7",
                    }}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProfile;
