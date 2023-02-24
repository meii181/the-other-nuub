import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";

const PasswordChange = () => {

return (
    <>
      <Container>
        <Row>
          <Col sm={5} md={10} xl={12}>
            <div
              className="d-flex align-items-center flex-column p-5"
              style={{ textAlign: "center", marginTop: "12rem" }}
            >
              <h1 className="mb-4" style={{ fontSize: 50 }}>
                Thank you!
              </h1>
              <p style={{ fontSize: 30, width: "90%" }}>
                Your password has been successfully changed and now can log in the portal.
              </p>
                <Button
                  href="/login"
                  className="mt-4 px-4"
                  style={{
                    fontSize: 25,
                    borderBottom: "4px solid black",
                    borderRadius: 20,
                    backgroundColor: "#7F7EC7",
                  }}
                >
                  Go to login
                </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PasswordChange