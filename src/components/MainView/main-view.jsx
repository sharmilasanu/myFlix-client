import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginView } from '../LoginView/login-view';
import { MovieCard } from '../MovieCard/movie-card';
import { MovieView } from '../MovieView/movie-view';
import { RegistrationView } from '../RegistrationView/registration-view';
import { GenreView } from '../GenreView/genre-view';
import { ProfileView } from '../ProfileView/profile-view';
import { DirectorView } from '../DirectorView/director-view';
import { Card, Form, Button, Container, Col, Row } from "react-bootstrap";
import './main-view.scss';


class MainView extends React.Component {

  constructor() {
    super(); 
    // Initial state is set to null
    this.state = {
    /* movies: [
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 2, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 3, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'},
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 5, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 6, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'},
        { _id: 4, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film directed by Christopher Nolan, with Emma Thomas, his wife. ', ImagePath: '...'},
        { _id: 5, Title: 'Avatar', Description: 'Avatar is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron', ImagePath: '...'},
        { _id: 6, Title: 'Gladiator', Description: 'Gladiator is a 2000 American-British epic historical drama film directed by Ridley Scott and written by David Franzoni', ImagePath: '...'}
      ],*/
      movies: [],
      selectedMovie: null,
      user : null
    }
  }
  
  // this component lifecycle method will be applied after the page is rendered
  // After loggng in ,even after page refresh the page stays in same page instead of logging out
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  //On logged in changing the state username and also storing the JWT token and username in Browser localstorage
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.UserName
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.UserName);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://sharmismyflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;
    
    return (
    
      <Router>
       
       <div >
      <Container>
      <Row className="main-view justify-content-md-center">
        <Routes>
       
        <Route path="/" element={() => {
          if (!user) return  <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
                   
           if (movies.length === 0) return <div className="main-view" />;
           return movies.map(movie => (
             <Col md={3} key={movie._id}>
               <MovieCard movie={movie} />
             </Col>
           ))
          
         }} />
        
        <Route  path="/register" render={() => {
          if (user) return <Redirect to="/" />
          return <RegistrationView />
        }} />
        <Route path='/profile' render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={12}>
                            <ProfileView user={user} setUser={user => this.setUser(user)}
                                movies={movies} onLoggedOut={() => this.onLoggedOut()}

                            />
                        </Col>
                    }} />
        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (!user || movies.length === 0) return <Redirect to="/" />;
          return <Col md={8}>
            <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/directors/:name" render={({ match, history }) => {
          if (!user || movies.length === 0) return <Redirect to="/" />;
          return <Col md={8}>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />

        <Route path="/genres/:name" render={({ match, history }) => {
          if (!user || movies.length === 0) return <Redirect to="/" />;
          return <Col md={8}>
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }
        } />

        <Route exact path="/users/:Username"
          render={({ history }) => {
            if (!user || movies.length === 0) return <Redirect to="/" />;
            return <ProfileView movies={movies} user={user}/>;
          }}
        />
        </Routes>
      </Row>
      </Container>
    </div>
    </Router>
  );
}
}

export default MainView;