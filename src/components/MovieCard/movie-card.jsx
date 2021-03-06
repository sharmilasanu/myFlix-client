import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import { Card, Button } from 'react-bootstrap';

export function MovieCard({ movie }) {
    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title style={{ fontWeight: 700, fontSize: "20px" }}>{movie.Title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: "20px" }}>{movie.Director.Name}</Card.Subtitle>
                <Link to={`/movies/${movie._id}`} >
                    <Button variant="info" className="mt-4">Open details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      ImagePath: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Title: PropTypes.string.isRequired
    }).isRequired
}