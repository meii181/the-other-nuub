import React, { useState, useEffect } from 'react';
import LoggedInNavigation from "./LoggedInNavigation";
import {Row, Col, Container, Button} from "react-bootstrap";
import { PersonFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();
    const[user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem("user"));
        if(storedUser){
            setUser(storedUser);
        } else {
            navigate("/login");
        }

    }, [navigate]);

  return (
    <>
    <LoggedInNavigation />
    <Container>
        <Row>
            <Col sm={12} md={10} lg={12}>
            <div className="user mt-5 d-flex align-items-center flex-column">
                <div style={{backgroundColor: "#F1F1F1", borderRadius: 100, width: 200, height: 200}}>
                    <PersonFill size={152} className="mt-4 ms-4"/>
                    </div>
               {user && <h1 className="mt-4" style={{fontSize: 60}}>{user.first_name} {user.last_name}</h1>}
            </div>
            <div className="user-section d-flex align-items-center flex-column m-4">
                <h2>First Name</h2>
                {user && <p style={{fontSize: 25, marginBottom: "2rem"}}>{user.first_name}</p>}

                <h2>Last Name</h2>
                {user && <p style={{fontSize: 25, marginBottom: "2rem"}}>{user.last_name}</p>}

                <h2>Company</h2>
                {user && <p style={{fontSize: 25, marginBottom: "2rem"}}>{user.company}</p>}

                <h2>Email address</h2>
                {user && <p style={{fontSize: 25, marginBottom: "2rem"}}>{user.email}</p>}

                <h2>Phone number</h2>
                {user && <p style={{fontSize: 25, marginBottom: "0.5rem"}}>{user.phone_number}</p>}

                <Button href="/updateprofile" className="update_profile px-3 py-2 mt-4" style={{backgroundColor: "#7F7EC7", borderBottom: "3px solid black", fontSize: 25, fontWeight: "bold", borderRadius: 20}}>
                    Update Profile
                </Button> 
            </div>
            </Col>
            </Row>
        </Container>
    </>
  )
}

export default Profile