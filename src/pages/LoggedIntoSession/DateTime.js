import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import useFormContext from "../../hooks/useFormContext";

const DateTime = () => {
  const { appointmentInput, handleChangeInput, errorMessage } =
    useFormContext();

  return (
    <Row>
      <Col sm={5} md={12} lg={12}>
        <>
          <Form.Group>
            <Form.Control
              size="lg"
              type="date"
              name="meeting_date"
              value={appointmentInput.meeting_date}
              onChange={handleChangeInput}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                fontSize: 25,
                borderRadius: 20,
                borderBottom: "3px solid grey",
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              size="lg"
              type="time"
              name="meeting_time"
              value={appointmentInput.meeting_time}
              onChange={handleChangeInput}
              style={{
                marginBottom: "0.5rem",
                padding: "1rem",
                fontSize: 25,
                borderRadius: 20,
                borderBottom: "3px solid grey",
              }}
            />
          </Form.Group>
          <p
            style={{
              color: "red",
              fontSize: 25,
              fontFamily: "secondary-font",
              fontWeight: "bold",
            }}
          >
            {errorMessage}
          </p>
        </>
      </Col>
    </Row>
  );
};

export default DateTime;
