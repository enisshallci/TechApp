import React from "react";
import { Container, Row, Col, Alert, Form, Button, Spinner} from "react-bootstrap";
import { useState } from "react";

import { Link } from "react-router-dom";


export const LoginPage = () => {
  const [validated, setValidated] = useState(false);
  const [password] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/*_______________________________________Email____________________________________ */}
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>
        {/*_______________________________________Password_________________________________ */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
              />
              
            {(password.length === 0) && (
                <Form.Control.Feedback type="invalid">
                Please enter your password.
                </Form.Control.Feedback>
            )}
            </Form.Group>
        {/*_______________________________________checkbox_____________________________________ */}
            <Form.Group className="mb-3" controlId="checkbox">
              <Form.Check
                name="doNotLogout"
                type="checkbox"
                label="Do not logout"
              />
            </Form.Group>
        {/*___________________________________________________________________________________ */}
            <Row className="pb-2">
                <Col>
                    Don't you have an account?
                    <Link to={"/register"}> Register </Link>
                </Col>
            </Row>
        {/*___________________________________________Button________________________________________ */}

            <Button variant="primary" type="submit" >
             <Spinner           //Ky spinner ne applikacion final ka me punu vetem kur klikohet butoni.
             as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
             />
            Login
            </Button>
        {/*__________________________________________Alert___________________________________ */}
            <Alert show={true} variant="danger">
                Wrong credentials
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

