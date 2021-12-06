import React, {useState} from 'react';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
      if (username.length < 4) return setError('Must include a username that is longer than 4 characters');
      if (password.length < 6) return setError('Must include a password that is longer than 6 characters');
      const alphaNum = /^[0-9a-zA-Z]+$/;
      if (!username.match(alphaNum)) return setError('Username must contain only letters and numbers');
      if (password !== confirmPassword) return setError('Passwords do not match');

      axios.post('https://avengers-database.herokuapp.com/users/', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
      })
          .then(response => {
              console.log(response.data);
              window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
          })
          .catch(e => {
              setError('Username already exists please pick another one')
              console.log('error registering the user')
          });
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