import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoggedInNavigation from "./LoggedInNavigation";
import { Row, Col, Container } from "react-bootstrap"; 

function Dashboard() {

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if(storedUser){
        setUser(storedUser);
        setLoggedIn(true);
    } else {
        navigate("/login");
    }

}, [navigate]);

  return (
    <>
    <LoggedInNavigation/>
    
    <Container>
      <Row>
        <Col sm={5} md={10} xl={12}>
          <div className="d-flex align-items-center flex-column p-5" style={{textAlign: "center", marginTop: "5rem"}}>
            {user && <h1 className="mb-5" style={{fontSize: 50}}>Welcome to your Nuub dashboard, {user.first_name}</h1>}
            <p style={{fontSize: 30, width: "90%"}}>Here you can update your creditentials, create a new meeting with us and manage your appointment :D</p>
            </div>
        </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard