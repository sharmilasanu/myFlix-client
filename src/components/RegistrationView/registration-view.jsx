import React, {useState} from 'react';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);
    };
    return (

        <Col sm = {5} >
        <Form >
          <h3>Registration</h3>
          <Form.Group controlId="formUsername">
            <Form.Label>Username :</Form.Label>
            <Form.Control type="text" placeholder = "Enter First Name" onChange={e => setUsername(e.target.value)} />
           </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control type="text" placeholder = "Should Contain minimun 8 Charchters" onChange={e => setPassword(e.target.value)} />
           </Form.Group>
    
          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="text"  placeholder = "Enter valid Email Address" onChange={e => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control type="text"  onChange={e => setBirthday(e.target.value)} />
          </Form.Group>

          <Button className="btn btn-dark btn-lg btn-block" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" type="button">Register</Button>
        </Form>
       </Col>
      );
}