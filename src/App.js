import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import MoviesIndexPage from './pages/MoviesIndexPage/MoviesIndexPage';
import userService from './utils/userService';
import AdminPage from './pages/AdminPage/AdminPage';

class App extends Component {

  state = {
    user: userService.getUser(),
    movies: []
  }

  handleUpdateMovies = (movies) => {
    this.setState({ movies })
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logOut();
    this.setState({ user: null });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <NavBar
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        </header>
        <Switch>
          <Route exact path='/signup' render={({ history }) =>
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/login' render={({ history }) =>
            <LoginPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          } />
          <Route exact path='/admin' render={({ history }) =>
            <AdminPage
              history={history}
            />
          } />
          <Route exact path='/movies' render={({ history }) =>
            <MoviesIndexPage
              history={history}
              handleUpdateMovies={this.handleUpdateMovies}
              movies={this.state.movies}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
