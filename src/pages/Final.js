import React, {useState} from "react";
import {Container, Form, Col, Button} from "react-bootstrap";
import NavigationPriceCalculator from "./NavigationPriceCalculator";
import axios from "axios";

const Final = () => {
    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorDisplayed, setErrorDisplayed] = useState(false);
    const [successDisplayed, setSuccessDisplayed] = useState(false);

    const formValidation = () => {
        let formIsValid = true;

        if(!full_name || !email || !phone_number){
            setErrorMessage("All the fields are required to be filled");
            setErrorDisplayed(true);
            formIsValid = false;
        } else {
            const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
            if(!emailRegex.test(email)) {
                setErrorMessage("The email is not valid, try again");
                setErrorDisplayed(true);
                formIsValid = false;
            } else {
                if(phone_number.length !== 8) {
                    setErrorMessage("Invalid format, it must be a danish phone number");
                    setErrorDisplayed(true);
                    formIsValid = false;
                } else {
                    setErrorDisplayed(false);
                }
              }
            }
                return formIsValid;
          };

            const handleSubmitForm = (event) => {
                event.preventDefault();

                if (formValidation()) {
                    const object = {
                        full_name: full_name,
                        email: email,
                        phone_number: phone_number,
                    };

                    axios
                    .post("http://localhost/bachelor_exam/client.php", object)
                    .then((response) => {
                        if(!successDisplayed) {
                            setSuccessMessage(
                                "Thank you, please check your inbox."
                              );
                              setSuccessDisplayed(true);
                        }
                        setErrorMessage("");
                        setErrorDisplayed(false);
                    })
                    .catch((error) => {
                      if(!errorDisplayed) {
                        setErrorMessage("The email has been registered already");
                        setErrorDisplayed(true);
                      }
                    });

                    axios
        .get("http://localhost/bachelor_exam/client.php", object)
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
    <>
    <NavigationPriceCalculator />
    <Container fluid style={{
          borderTop: "4px solid black",
          borderBottom: "4px solid black",
          textAlign: "center",
          marginTop: "1rem",
          padding: "1rem",
        }}>
<h3 className="estimate">Your estimated price is...</h3>
<h1 className="price">780 DKK/month</h1>
<p className="paragraph_1">Would you like to have a discussion with us about your project?
</p>
<p className="paragraph_2">Then enter your details down below, and one bonus, you will get the estimated price, together with the additional details in your email inbox.
</p>
<Col xs={13} md={12} xxl={8} style={{display: "flex", justifyContent: "center"}}>
<Form onSubmit={handleSubmitForm} style={{
                width: "45%",
                padding: "1rem 3rem",
                marginTop: "2rem",
                marginLeft: "31rem",
                fontSize: 25,
              }}>
<Form.Group
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Form.Label>Your full name</Form.Label>
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
                <Form.Label>Your email address</Form.Label>
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

                <Form.Group>
                <Form.Label>Your phone number</Form.Label>
                <Form.Control
                  name="phone_number"
                  value={phone_number}
                  type="text"
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  style={{
                    borderBottom: "3px solid black",
                    height: "3rem",
                  }}
                ></Form.Control>
                </Form.Group>
                <p
                style={{
                  color: "red",
                  fontSize: 25,
                  fontFamily: "secondary-font",
                  fontWeight: "bold",
                  marginTop: "1rem"
                }}
              >
                {errorMessage}
              </p>
              <p
                style={{
                  color: "green",
                  fontSize: 25,
                  fontWeight: "bold",
                  fontFamily: "secondary-font",
                  marginTop: "1rem"
                }}
              >
                {successMessage}
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
                  marginTop: "1rem",
                }}
              >
                Submit
              </Button>{" "}
    </Form>
</Col>
        </Container>
        </>
  );
};

export default Final;