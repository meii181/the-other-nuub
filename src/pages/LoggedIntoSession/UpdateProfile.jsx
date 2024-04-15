import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import LoggedInNavigation from "./LoggedInNavigation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState({});
  const [isLoggedIn, setLoggedIn] = useState(false);
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
      .get("https://the-other-nuub-backend-583b88d181b4.herokuapp.com/get_user.php", { withCredentials: true })
      .then((response) => {
        if (response.data) {
          setUser(response.data);
          if (!isLoggedIn && window.location.pathname !== "/updateprofile") {
            setLoggedIn(true);
            navigate("/updateprofile");
          }
        } else {
          console.log("Oops");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
  }, [isLoggedIn, navigate]);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserInput((values) => ({ ...values, [name]: value }));
  };

  const handleUpdateFormSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://the-other-nuub-backend-583b88d181b4.herokuapp.com/update_profile.php",
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
              className="form d-flex justify-content-center flex-column"
              style={{ marginTop: "4rem", textAlign: "center" }}
            >
              <h1 style={{ fontSize: 60 }}>{t("Edit your credentials")}</h1>
              <p style={{ fontSize: 25, margin: "1rem 0" }}>
                {t("Write down your following credentials you wish to change")}
              </p>
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
                    name={t("phone_number")}
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
                    placeholder={t("Password")}
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
                    placeholder={t("Confirm password")}
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
                  {t("Update")}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateProfile;
