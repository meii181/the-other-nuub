import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EnvelopeAt } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry_description, setinquiryDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorDisplayed, setErrorDisplayed] = useState(false);
  const [successDisplayed, setSuccessDisplayed] = useState(false);

  const validationForm = () => {
    let formIsValid = true;

    if (!full_name || !email || !inquiry_description) {
      setErrorMessage("All the fields are required to be filled :)");
      setErrorDisplayed(true);
      formIsValid = false;
    } else {
      const emailRegex =
        /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
      if (!emailRegex.test(email)) {
        setErrorMessage("Your email is not valid :(");
        setErrorDisplayed(true);
        formIsValid = false;
      } else {
        setErrorDisplayed(false);
      }
    }
    return formIsValid;
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (validationForm()) {
      const object = {
        full_name: full_name,
        email: email,
        inquiry_description: inquiry_description,
      };

      axios
        .post("http://localhost/bachelor_exam/contact.php", object)
        .then((response) => {
          if (!successDisplayed) {
            setSuccessMessage(
              "Your contact details has been registered, we'll get in touch as fast as you say fish! ;D"
            );
            setSuccessDisplayed(true);
          }
          setErrorMessage("");
          setErrorDisplayed(false);
        })
        .catch((error) => {
          if (!errorDisplayed) {
            setErrorMessage("The email has already been registered!");
            setErrorDisplayed(true);
          }
        });

      axios
        .get("http://localhost/bachelor_exam/contact.php", object)
        .catch((error) => {
          if (
            error.response &&
            error.response.data === "The email has already been registered!"
          ) {
            setErrorMessage("The email has already been registered!");
          }
        });
    }
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
                  value={full_name}
                  name="full_name"
                  onChange={(event) => setFullName(event.target.value)}
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
                  value={email}
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
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
                  value={inquiry_description}
                  onChange={(event) =>
                    setinquiryDescription(event.target.value)
                  }
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
                  fontWeight: "bold",
                  backgroundColor: "#7F7EC7",
                  color: "whitesmoke",
                  borderBottom: "4px solid black",
                  marginTop: "3rem",
                }}
              >
                {t("Submit")}
              </Button>{" "}
            </Form>
          </Col>

          <Col xs={4} lg={8}>
            <EnvelopeAt className="envelope" size={500}></EnvelopeAt>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
