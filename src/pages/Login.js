import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import AuthenticationNav from "./AuthenticationNav";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  function emailValidate() {
    const emailRegex = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]@(gmail|hotmail|outlook|yahoo)\.com\b$/g;
    return emailRegex.test(email);
  }

  const LogInValidation = () => {
    let formValid = true;

    if(!email || !password){
      setErrorMessage("The fields must be filled in");
      formValid = false;

    } else if(!emailValidate()) {
      setErrorMessage("The email is not valid");
      formValid = false;
    }

    else if (password.length < 8){
      setErrorMessage("The password is not strong");
      formValid = false;
    }

    else if(password.length < 8){
      setErrorMessage("The password is not strong");
      formValid = false;

    } else {
      setErrorMessage("");
    }
    return formValid;
  };
  
  const handleLogInSubmit = (event) => {
    event.preventDefault();

    if(LogInValidation()){
      const logged_in = {
        email: email,
        password: password,
      };

      axios.post("http://localhost/bachelor_exam/login.php", logged_in)
      .then((response) => {
        if(response.data) {
        const userData = response.data;
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      } else {
        setErrorMessage(response.data);

      }
      })
      .catch((error) => {
        if (error.response && error.response.data === "Wrong email or password"){
          setErrorMessage("Wrong email or password");
  
        }
          else if (error.response && error.response.data === "User does not exist"){
            setErrorMessage("User does not exist");
    
        } else {
          console.log(error);
        }
      });

    }
  };

    return (
      <>
      <AuthenticationNav />
    <Container fluid>
      <Row>
        <Col sm={12} md={12} lg={5} style={{ backgroundColor: "#FF629A", height: "100vh" }}>
        </Col>

        <Col sm={12} md={12} lg={6}>
          <div className="text" style={{textAlign: "center", marginTop: "7rem"}}>
          <h1 className="mb-2 p-4" style={{fontSize: 55}}>Log In</h1>
          <p className="mb-4" style={{fontSize: 30}}>Introduce your creditentials in order to log in the portal</p>
          </div>
        
          <Form onSubmit={handleLogInSubmit} className="py-4 px-5 d-flex align-items-center flex-column" style={{fontSize: 25, fontFamily: "primary-font"}}>
            <Form.Group className="mb-3">
              <Form.Control type="email" name="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} style={{height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" value={password} autoComplete="off" onChange={(event) => setPassword(event.target.value)} style={{ height: "2.7rem", marginBottom: "1rem", padding: "1.5rem", fontSize: 25, borderRadius: 20, borderBottom: "3px solid grey" }}/>
            </Form.Group>

            <Button type="submit" className="mt-3 mb-5 px-4" style={{fontSize: 25, borderBottom: "4px solid black", borderRadius: 20, backgroundColor: "#7F7EC7"}}>Log in</Button>

            <p style={{color: "red", fontSize: 25, fontFamily: "secondary-font", fontWeight: "bold"}}>{errorMessage}</p>

            <p>
              Not registered yet? Sign up <a href="/signup" style={{textDecoration: "none", color: "black", fontWeight: "bold"}}>here!</a>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Login;
