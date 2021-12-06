import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import './profile-view.scss';


export function ProfileView() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [error, setError] = useState('')


    const token = localStorage.getItem('token');
    const handleSubmit = (e) => {
        e.preventDefault();

        

        axios.put(`https://avengers-database.herokuapp.com/users/${user.Username}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                console.log(response.data);
                setUser(response.data);
                window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
            })
            .catch(e => {
                console.log('error updating the user')
            });
    }



    return (
        <Container className="mt-3">
            <Row>
               
                <Col md={8} className="d-flex justify-content-center">
                    <Form className="update-form" onSubmit={handleSubmit} style={{ textAlign: "center" }}>
                        <h1 style={{ fontFamily: 'Montserrat', fontWeight: 700 }}>Update User</h1>
                        <p className="text-secondary">Only fill in the fields you want updated</p>
                        <FloatingLabel controlId="formUsername" label="Username" className="mb-3 mt-4">
                            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="username" />
                        </FloatingLabel>
                        <FloatingLabel controlId="formPassword" label="Password" className="mb-3">
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" />
                        </FloatingLabel>
                        <FloatingLabel controlId="formConfirmPassword" label="Confirm Password*" className="mb-3">
                            <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="confirmPassword" />
                        </FloatingLabel>
                        <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
                            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" />
                        </FloatingLabel>
                        <FloatingLabel controlId="formBirthday" label="Birthday" className="mb-3">
                            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="birthday" />
                        </FloatingLabel>
                        {error && <h5 style={{ color: "red", marginBottom: "40px" }}>{error}</h5>}
                        <div className="d-grid gap-2">
                            <Button size="lg" variant="success" type="submit">Submit</Button>
                        </div>
                        
                    </Form>
                </Col>
            </Row>

        </Container>
    )
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Birthday: PropTypes.date,
        FavoriteMovies: PropTypes.array
    }).isRequired,
    setUser: PropTypes.func.isRequired,
}