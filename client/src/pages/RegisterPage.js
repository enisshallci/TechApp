import React from "react";
import { Container, Row, Col, Alert, Form, Button, Spinner} from "react-bootstrap";
import { useState } from "react";

import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handlePasswordChange = (event) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    if (passwordValue.length === 0) {
      setPasswordError("Please enter your password.");
    } else if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {

        const password = document.querySelector("input[name=password]")
        const confirm = document.querySelector("input[name=confirmPassword]")
        if(confirm.value === password.value) {
            confirm.setCustomValidity("")
        } else {
            confirm.setCustomValidity("Passwords do not match")
        }
    }
  };
  
  return (
    <Container>
      <Row className="mt-5 justify-content-md-center">
        <Col md={6}>
          <h1>Register</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
        {/*_______________________________FirstName____________________________________________ */}
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your first name"
                defaultValue=""
                name="name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>
        {/*_________________________________LastName____________________________________________ */}
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Your Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your last name"
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your last name
              </Form.Control.Feedback>
            </Form.Group>
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
        {/*_______________________________________Password__________________________________________ */}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                minLength={6}
                onChange={handlePasswordChange}
              />
              {passwordError && (
                <Form.Control.Feedback type="invalid">
                {passwordError}
                </Form.Control.Feedback>
            )}  
            {(!passwordError && password.length === 0) && (
                <Form.Control.Feedback type="invalid">
                Please enter your password.
                </Form.Control.Feedback>
            )}
            </Form.Group>
        {/*_____________________________________Confirm Password____________________________________ */}
            <Form.Group className="mb-3" controlId="passwordRepeat">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Repeat Password"
                name="confirmPassword"
                minLength = {6}
                onChange={handlePasswordChange}
              />
              <Form.Control.Feedback type="invalid">
                Both Pasaswords should match
              </Form.Control.Feedback>
            </Form.Group>
        {/*__________________________________________________________________________________________ */}

            <Row className="pb-2">
                <Col>
                    Do you have an account already?
                    <Link to={"/login"}> Login </Link>
                </Col>
            </Row>
        {/*__________________________________________Button__________________________________________ */}
            <Button type="submit" >
             <Spinner           
             as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
             />
            Submit
            </Button>
        {/*__________________________________________Alert___________________________________ */}

            <Alert show={true} variant="danger">
                User with that email already exists!
            </Alert>
            <Alert show={true} variant="info">
                User created
            </Alert>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

