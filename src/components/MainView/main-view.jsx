import React from 'react';
import axios from 'axios';

import { LoginView } from '../LoginView/login-view';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";


class MainView extends React.Component {

  constructor() {
    super(); 
    // Initial state is set to null
    this.state = {
     movies: [
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 2, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'},
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 5, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 6, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'},
        { _id: 4, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, with Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 5, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 6, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'}
      ],
      //movies: [],
      selectedMovie: null,
      user : null
    }
  }
  
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onLogout(){
   
    console.log("logged out");
    return  <LoginView />;
  };

  render() {
   
    const { movies, selectedMovie,user } = this.state;
    console.log(user)
   
     /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
     if (!user) return  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
     else{
    // Before the movies have been loaded
     if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
         {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? (
            <Row className="justify-content-md-center"> <Col md={8}> <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} /> </Col></Row>
            )
          :(
            <Row className="justify-content-md-center">
              {movies.map(movie => (
                <Col md={4}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    );
      }
  }
}

export default MainView;