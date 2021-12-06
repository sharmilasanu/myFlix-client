import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Row ,Container} from "react-bootstrap";
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://sharmismyflix.herokuapp.com/login', {
      UserName: username,
      Password: password
    })
    .then(response => {
      
      const data = response.data;
      console.log(response.data)
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
      console.log(password)
    });
  };
 
  
  return (

  
    <Form>
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
  
  );
}