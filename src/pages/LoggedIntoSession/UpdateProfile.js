import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import LoggedInNavigation from "./LoggedInNavigation";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({});
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone_number: "",
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost/api/get_user.php", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          const user = response.data;
          setUser(user);
          navigate("/updateprofile");
        } else {
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost/api/update_profile.php",
        new URLSearchParams({
          first_name: userInput.first_name,
          last_name: userInput.last_name,
          email: userInput.email,
          phone_number: userInput.phone_number,
          password: userInput.password,
          confirm_password: userInput.confirm_password,
        }),
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data === "Your profile has been updated successfully!") {
          setSuccessMessage("Your profile has been updated successfully!");
          setErrorMessage("");
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
          error.response.data === "The email is not valid"
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
          setErrorMessage("");
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
                      placeholder={user.first_name}
                      value={userInput.first_name}
                      onChange={handleChange}
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
                      placeholder={user.last_name}
                      value={userInput.last_name}
                      onChange={handleChange}
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
                      placeholder={user.email}
                      value={userInput.email}
                      autoComplete="off"
                      onChange={handleChange}
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
                      placeholder={user.phone_number}
                      value={userInput.phone_number}
                      onChange={handleChange}
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
                      placeholder="Password"
                      autoComplete="off"
                      value={userInput.password}
                      onChange={handleChange}
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
                      placeholder="Confirm password"
                      autoComplete="off"
                      value={userInput.confirm_password}
                      onChange={handleChange}
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
