import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row } from "react-bootstrap";
import '../LoginView/login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
     props.onLoggedIn(username);
  };
  
  return (

    <Col sm = {5} >
    <Form className = "login-form">
      <h3>Login</h3>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" placeholder = "Enter Username" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password"  placeholder = "Enter Password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button className="btn btn-dark btn-lg btn-block" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="secondary" type="button">Regsiter</Button>
    </Form>
   </Col>
  );
}