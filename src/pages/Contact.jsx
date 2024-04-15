import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [contactInput, setContactInput] = useState({
    full_name: "",
    email: "",
    inquiry_description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContactInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    axios
      .post(
        "https://the-other-nuub-backend-583b88d181b4.herokuapp.com/contact.php",
        new URLSearchParams({
          full_name: contactInput.full_name,
          email: contactInput.email,
          inquiry_description: contactInput.inquiry_description,
        })
      )
      .then((response) => {
        if (
          response.data ===
          "Your contact details has been registered, we'll get in touch as fast as you say fish! ;D"
        ) {
        }
        setSuccessMessage(
          "Your contact details has been registered, we'll get in touch as fast as you say fish! ;D"
        );
        setErrorMessage("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data === "All fields must be filled"
        ) {
          setErrorMessage("All fields must be filled");
        } else if (
          error.response &&
          error.response.data === "The email is not valid"
        ) {
          setErrorMessage("The email is not valid");
        } else if (
          error.response &&
          error.response.data === "The full name must be at least 8 characters"
        ) {
          setErrorMessage("The full name must be at least 8 characters");
        } else if (
          error.response &&
          error.response.data === "The full name cannot be more 20 characters"
        ) {
          setErrorMessage("The full name cannot be more 20 characters");
        } else if (
          error.response &&
          error.response.data === "Maximum 200 characters allowed"
        ) {
          setErrorMessage("Maximum 200 characters allowed");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <section id="contact-and-support">
      <Container className="container-contact" fluid>
        <Row>
          <Col xs={12} md={12} xl={8}>
            <div className="yellow-background"></div>
            <h1
              style={{
                fontSize: 55,
                marginLeft: "8rem",
                position: "relative",
              }}
            >
              {t("Do you have any questions or would like some assistance?")}
            </h1>
            <p
              className="w-50"
              style={{
                fontSize: 25,
                marginTop: "2rem",
                marginLeft: "8rem",
                fontFamily: "secondary-font",
                position: "relative",
              }}
            >
              {t(
                "You can actually do both, feel free to contact us, regardless of needing assistance or a small question."
              )}
            </p>
            <Form
              onSubmit={handleSubmitForm}
              style={{
                width: "45%",
                padding: "0 3rem",
                marginTop: "3rem",
                marginLeft: "5rem",
                fontSize: 25,
              }}
            >
              <Form.Group
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Form.Label>{t("Your full name")}</Form.Label>
                <Form.Control
                  type="text"
                  value={contactInput.full_name}
                  name="full_name"
                  onChange={handleChangeInput}
                  style={{
                    borderBottom: "3px solid black",
                    height: "3rem",
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Form.Label>{t("Your email address")}</Form.Label>
                <Form.Control
                  name="email"
                  value={contactInput.email}
                  type="email"
                  onChange={handleChangeInput}
                  style={{
                    borderBottom: "3px solid black",
                    height: "3rem",
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Form.Label>{t("Describe your inquiry")}</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="inquiry_description"
                  value={contactInput.inquiry_description}
                  onChange={handleChangeInput}
                  style={{
                    borderBottom: "3px solid black",
                  }}
                ></Form.Control>
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
                  fontWeight: "bold",
                  fontFamily: "secondary-font",
                }}
              >
                {t(successMessage)}
              </p>
              <Button
                type="submit"
                value="Submit Form"
                style={{
                  fontSize: 30,
                  fontFamily: "primary-font",
                  fontWeight: "bold",
                  backgroundColor: "#7F7EC7",
                  color: "whitesmoke",
                  borderBottom: "4px solid black",
                  marginTop: "3rem",
                  borderRadius: 20,
                  padding: "0.5rem 1rem",
                }}
              >
                {t("Submit")}
              </Button>{" "}
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
