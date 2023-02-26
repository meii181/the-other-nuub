import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const Description = (props) => {
  return (
    <Row>
      <Col sm={3} md={12} lg={12}>
        <Form className="py-4 my-4 px-5">
          <Form.Group>
            <Form.Control
              as="textarea"
              name="meeting_description"
              value={props.value}
              onChange={props.onChange}
              rows={4}
              placeholder="Describe your upcoming project here..."
              style={{
                padding: "1rem 3rem 3rem 1.5rem",
                fontSize: 25,
                fontFamily: "secondary-font",
                borderRadius: 20,
                borderBottom: "4px solid grey",
              }}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default Description;
