import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { EnvelopeAt } from "react-bootstrap-icons";

const Contact = () => {

  const[full_name, setFullName] = useState("");
  const[email, setEmail] = useState("");
  const[type_of_inquiry, setTypeInquiry] = useState("");
  const[inquiry_description, setinquiryDescription] = useState("");
  const[errorMessage, setErrorMessage] = useState("");
  const[successMessage, setSuccessMessage] =useState("");


  const validationForm = () => {


    if(!full_name || !email || !type_of_inquiry || !inquiry_description){
      setErrorMessage("All the fields are required to be filled :)");
      return false;
    }

    const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
    if (!emailRegex.test(email)){
      setErrorMessage("Your email is not valid :(");
      return false;
    }


    return true;
  }
 
  const handleSubmitForm = (event) => {
    event.preventDefault();
    
    if (validationForm()) {
    
      const object = {
        full_name: full_name,
        email: email,
        type_of_inquiry: type_of_inquiry,
        inquiry_description: inquiry_description,
      }


        axios.post("http://localhost/bachelor_exam/api-contact.php", object)
        .then(setSuccessMessage("Your contact details has been registered, we'll get in touch as fast as you say fish! ;D"))
        .catch(setErrorMessage(""));

        axios.get("http://localhost/bachelor_exam/api-contact.php", object)
        .catch(setErrorMessage("The email has already been registered!"))

        
  }
}


  return (
    <section id="contact-and-support">
      <Container
        fluid
        style={{
          paddingTop: "5rem",
          height: 1400,
          fontFamily: "primary-font",
        }}
      >
        <Row>
          <Col xs={4} lg={8}>
            <div
              style={{
                backgroundColor: "#F9E95D",
                width: 900,
                height: 1625,
                position: "absolute",
                top: 4500,
                left: 0,
                zIndex: -1,
              }}
            ></div>
            <h1
              style={{
                fontSize: 55,
                marginLeft: "8rem",
                position: "relative",
              }}
            >
              Would you like to get in touch with us? Or you need assistance?
            </h1>
            <p
              className="w-75"
              style={{
                fontSize: 25,
                marginTop: "2rem",
                marginLeft: "8rem",
                fontFamily: "secondary-font",
                position: "relative",
              }}
            >
              You can actually do both, feel free to contact us, regardless of
              needing assistance or just a small talk with us.
            </p>
            <p style={{
                color: "red",
                fontSize: 25,
                marginTop: "2rem",
                marginLeft: "8rem",
                fontFamily: "secondary-font",
                fontWeight: "bold",
              }}>{errorMessage}
              </p>
              <p style={{
                color: "green",
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: "8rem",
                fontFamily: "secondary-font",
              }} className="w-50">
                {successMessage}
              </p>
            <Form
            onSubmit = {handleSubmitForm}
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
                <Form.Label>Your full name</Form.Label>
                <Form.Control
                  type="text"
                  value={full_name}
                  name="full_name"
                  onChange={event => setFullName(event.target.value)}
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
                  onChange={event => setEmail(event.target.value)}
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
                <Form.Label>Select the type of inquiry</Form.Label>
                <Form.Select
                  name="type_of_inquiry"
                  value={type_of_inquiry}
                  onChange={event => setTypeInquiry(event.target.value)}
                  style={{
                    borderBottom: "3px solid black",
                    height: "3rem",
                    fontSize: 20,
                  }}
                >
                  <option>--- Please chose the type of inquiry ---</option>
                  <option>Appointment</option>
                  <option>Addressing a question</option>
                  <option>Support/Assistance</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                style={{
                  marginBottom: "2rem",
                }}
              >
                <Form.Label>Describe your inquiry</Form.Label>
                <Form.Control
                  type="text"
                  name="inquiry_description"
                  value={inquiry_description}
                  onChange={event => setinquiryDescription(event.target.value)}
                  style={{
                    borderBottom: "3px solid black",
                    height: "10rem",
                  }}
                ></Form.Control>
              </Form.Group>
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

          <Col xs={4} lg={8}>
            <EnvelopeAt
              size={500}
              style={{
                position: "absolute",
                left: 800,
                top: 5280,
              }}
            ></EnvelopeAt>
          </Col>
        </Row>
      </Container>
    </section>
  );
};



export default Contact;
