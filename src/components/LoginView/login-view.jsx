import React, { useState } from 'react';
import { Form,FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI

// scss file 
import './login-view.scss'

// logo img



export function LoginView({ onLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        // error validation
        if (username.length < 4) return setError('Must include a username that is longer than 4 characters');
        if (password.length < 6) return setError('Must include a password that is longer than 6 characters');

        axios.post('https://sharmismyflix.herokuapp.com/login/', {
            UserName: username,
            Password: password,
        })
            .then(response => {
                onLoggedIn(response.data);
            })
            .catch(err => {
                setError("User does not exist");
                console.error(`User does not exist, ${err}`);
            })
    }

    return (
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center login">
            <h1 className="d-flex align-items-center mb-5" style={{ fontFamily: 'Montserrat', fontWeight: 700, color: "#777978" }}>
               
            </h1>
            <Form className="login-view" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                <h1 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Login</h1>
                
                <FloatingLabel controlId="formUsername" label="Username" className="mb-3" style = {{ textAlign : "left",fontWeight: 400 }}></FloatingLabel>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" required />
                
                <FloatingLabel controlId="formPassword" label="Password" className="mb-3" style = {{ textAlign : "left", fontWeight: 400}}></FloatingLabel>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
                
                {error && <h5 style={{ color: "red", marginBottom: "40px" }}>Incorrect username or password</h5>}
                <div className="d-grid gap-2">
                    <Button size="lg" variant="success" type="submit">Submit</Button>
                </div>
                <Link to={`/register`}>
                    <Button size="lg" variant="primary" className="register-button"> Register</Button>
                </Link>
            </Form>
        </div >
    )
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}