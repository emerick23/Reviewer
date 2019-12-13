import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import MoviesIndexPage from './pages/MoviesIndexPage/MoviesIndexPage';
import AdminPage from './pages/AdminPage/AdminPage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import userService from './utils/userService';
import movieService from './utils/movieService'

class App extends Component {

  state = {
    user: userService.getUser(),
    movies: null
  }

  async componentDidMount() {
    console.log('app mounted')
    const movies = await movieService.moviesIndex()
    this.setState({ movies })
}

  handleUpdateMovies = (updatedMovies) => {
    this.setState({ movies: updatedMovies })
    console.log('app movies updated')
  }

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  }

  handleLogout = () => {
    userService.logOut();
    this.setState({ user: null });
  }

  render() {
    if (!this.state.movies) {
      return <div>loading...</div>
    }
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
              handleUpdateMovies={this.handleUpdateMovies}
            />
          } />
          <Route exact path='/movies' render={({ history }) =>
            <MoviesIndexPage
              history={history}
              handleUpdateMovies={this.handleUpdateMovies}
              movies={this.state.movies}
            />
          } />
          <Route exact path='/movies/:idx' render={(props) =>
            <MovieDetailPage
            {...props} 
            movies={this.state.movies}
            />
          } />
        </Switch>
      </div>
    );
  }
}

export default App;
