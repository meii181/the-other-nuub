import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorDisplayed, setErrorDisplayed] = useState(false);

  function emailValidation() {
    const emailRegex =  /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
    return emailRegex.test(email);
  } 

  const SignUpFormValidation = () => {
    let formValid = true;

    if(!first_name || !last_name || !company || !email || !phone_number || !password || !confirm_password){
      setErrorMessage("All fields must be filled in");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(!emailValidation) {
      setErrorMessage("The email is not valid");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(first_name.length < 2){
      setErrorMessage("Your first name must be longer than 2 characters");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(last_name.length < 2){
      setErrorMessage("Your last name must be longer than 2 characters");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(company.length < 3){
      setErrorMessage("Please enter a valid name of the company");
      setErrorDisplayed(true);
    } else {
      setErrorDisplayed(false);
    }

    if(phone_number.length !== 8){
      setErrorMessage("You must provide a danish phone number");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(password.length < 8){
      setErrorMessage("Your password is not strong enough");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(phone_number.length !== 8){
      setErrorMessage("You must provide a danish phone number");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

    if(confirm_password.length !== password.length){
      setErrorMessage("The passwords does not match");
      setErrorDisplayed(true);
      formValid = false;
    } else {
      setErrorDisplayed(false);
    }

  return formValid;
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();

    if(SignUpFormValidation) {
      const register_account = {
        first_name: first_name,
        last_name: last_name,
        company: company,
        email: email,
        phone_number: phone_number,
        password: password,
        confirm_password: confirm_password
      };

      axios.post("http://localhost/bachelor_exam/signup.php", register_account)
      .then((response) => {

          // if the signup is successful
          navigate("/confirmation");
          setErrorMessage("");
          setErrorDisplayed(false);
        }) 
        .catch((error) => {
        if(!errorDisplayed) {
          setErrorMessage("The email has already been registered");
          setErrorDisplayed(true);
        } else {
          setErrorMessage("The phone number has already been registered");
          setErrorDisplayed(true);
        }
        });

        //fetching the email registration validation from the database
        axios.get("http://localhost/bachelor_exam/signup.php", register_account)
        .catch((error) => {
          if (error.response && error.response.data === "The email has already been registered"){
            setErrorMessage("The email has already been registered");
          } else if (error.response && error.response.data === "The phone number has already been registered"){
            setErrorMessage("The phone number has already been registered");
          }
        });
    }
  }

  return (
    <Container fluid>
    <Row>
      <Col sm={12} md={12} lg={5} style={{ backgroundColor: "#F9E95D", height: "130vh" }}>
      </Col>

      <Col sm={12} md={12} lg={6} style={{fontFamily: "primary-font"}}>
        <div className="text" style={{textAlign: "center", marginTop: "2rem"}}>
        <h1 className="mb-1 p-4" style={{fontSize: 55}}>Sign Up</h1>
        <p className="mb-4" style={{fontSize: 30}}>Introduce your creditentials in order to register an account</p>
        </div>
<p style={{color: "red", fontSize: 25, fontFamily: "secondary-font", fontWeight: "bold"}}>{errorMessage}</p>
        <Form onSubmit={handleSignUpSubmit} className="py-4 px-5 d-flex align-items-center flex-column" style={{fontSize: 25}}>
        <Form.Group className="mb-3">
            <Form.Control type="first_name" placeholder="First Name" value={first_name} onChange={(event) => setFirstName(event.target.value)} style={{height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="last_name" placeholder="Last Name" value={last_name} onChange={(event) => setLastName(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="company" placeholder="Company" value={company} onChange={(event) => setCompany(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} style={{height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="phone_number" placeholder="Phone Number" value={phone_number} onChange={(event) => setPhoneNumber(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Password" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="password" placeholder="Confirm Password" value={confirm_password} autoComplete="off" onChange={(event) => setConfirmPassword(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
          </Form.Group> 

          <Button value="Submit Form" className="mt-3 mb-5 px-4" style={{fontSize: 25, borderBottom: "4px solid black", borderRadius: 20, backgroundColor: "#7F7EC7"}}>Register</Button>

          <p>
            Already have an account? Log in <a href="/login" style={{textDecoration: "none", color: "black", fontWeight: "bold"}}>here!</a>
          </p>
        </Form>
      </Col>
    </Row>
  </Container>
  )
}

export default Signup