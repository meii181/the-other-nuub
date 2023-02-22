import React from "react";
import AuthenticationNav from "./AuthenticationNav";
import {Row, Col, Container} from "react-bootstrap";

const EmailConfirmationSent = () => {

  return (
    <>
    <AuthenticationNav />
    <Container>
        <Row>
            <Col sm={5} md={10} xl={12}>
            <div className="d-flex align-items-center flex-column p-5" style={{textAlign: "center", marginTop: "12rem"}}>
            <h1 className="mb-5" style={{fontSize: 50}}>One step closer...</h1>
            <p style={{fontSize: 30, width: "90%"}}>We have sent you an email with the verification link so that you could gain access to the portal</p>
            </div>
            </Col>
            </Row>
            </Container>
    </>
  )
}

export default EmailConfirmationSent