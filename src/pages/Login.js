import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorDisplayed, setErrorDisplayed] = useState(false);

  function emailValidate() {
    const emailRegex =  /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
    return emailRegex.test(email);
  }

  const LogInValidation = () => {
    let formValid = true;

    if(!email || !password){
      setErrorMessage("The fields must be filled in");
      setErrorDisplayed(true);
    } else {
      setErrorDisplayed(false);
    }

    if(!emailValidate){
      setErrorMessage("The email is not valid");
      setErrorDisplayed(true);
    } else {
      setErrorDisplayed(false);
    }

    if(password.length < 8){
      setErrorMessage("The password is not strong");
      setErrorDisplayed(true);
    } else {
      setErrorDisplayed(false);
    }
    return formValid;
  };
  
  const handleLogInSubmit = (event) => {
    if(LogInValidation){
      const logged_in = {
        email: email,
        password: password
      };

      axios.post("http://localhost/bachelor_exam/login.php", logged_in)
      .then((response) => {
        navigate("/dashboard");
        setErrorMessage("");
        setErrorDisplayed(false);
      })
      .catch((error) => {
        if(!errorDisplayed) {
          setErrorMessage("Wrong email or password");
          setErrorDisplayed(true);
        } else {
          setErrorMessage("User does not exist");
          setErrorDisplayed(true);
        }
      });

      axios.get("http://localhost/bachelor_exam/login.php", logged_in)
      .catch((error) => {
        if (error.response && error.response.data === "Wrong email or password"){
          setErrorMessage("Wrong email or password");
        } else if(error.response && error.response.data === "User does not exist") {
          setErrorMessage("User does not exist");
        }
      })
    }
  }

    return (
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={5} style={{ backgroundColor: "#FF629A", height: "100vh" }}>
        </Col>

        <Col sm={12} md={12} lg={6} style={{fontFamily: "primary-font"}}>
          <div className="text" style={{textAlign: "center", marginTop: "7rem"}}>
          <h1 className="mb-2 p-4" style={{fontSize: 55}}>Log In</h1>
          <p className="mb-4" style={{fontSize: 30}}>Introduce your creditentials in order to log in the portal</p>
          </div>

<p style={{color: "red", fontSize: 25, fontFamily: "secondary-font", fontWeight: "bold"}}>{errorMessage}</p>
        
          <Form onChange={handleLogInSubmit} className="py-4 px-5 d-flex align-items-center flex-column" style={{fontSize: 25}}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} style={{height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
            </Form.Group>

            <Button className="mt-3 mb-5 px-4" style={{fontSize: 25, borderBottom: "4px solid black", borderRadius: 20, backgroundColor: "#7F7EC7"}}>Log in</Button>

            <p>
              Not registered yet? Sign up <a href="/signup" style={{textDecoration: "none", color: "black", fontWeight: "bold"}}>here!</a>
            </p>
            <p>
              Forgot your password? Recover it{" "}
              <a href="/recoverpassword" style={{textDecoration: "none", color: "black", fontWeight: "bold"}}>here!</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
