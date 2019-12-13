import React, { Component } from 'react'
import MovieCreateForm from '../../components/MovieCreateForm/MovieCreateForm'
import movieService from '../../utils/movieService'
import MovieEditForm from '../../components/MovieEditForm/MovieEditForm'

class AdminPage extends Component {

    state = {
        movies: null,
        createForm: false,
        editForm: false,
        editFormMovie: null,
        editFormMovieIdx: null
    }

    async componentDidMount() {
        console.log('index mounted')
        let movies = await movieService.moviesIndex()
        this.setState({ movies })
    }

    handleCreateForm = () => {
        this.setState(prevState => ({
            createForm: !prevState.createForm
        }))
    }

    handleEditForm = (movie, idx) => {
        if (!this.state.editFormMovie) {
            this.setState({
                editForm: true,
                editFormMovie: movie,
                editFormMovieIdx: idx
            })
        } else {
            this.setState({
                editForm: false,
                editFormMovie: null,
                editFormMovieIdx: null
            })
        }
    }

    handleAddMovie = (movie) => {
        let updatedMovies = [...this.state.movies, movie]
        this.setState({ movies: updatedMovies })
        this.props.handleUpdateMovies(updatedMovies)
    }

    handleEditMovie = (movie, movieIdx) => {
        let editMovie = [...this.state.movies]
        editMovie.splice(movieIdx, 1, movie)
        let updatedMovies = editMovie
        this.setState({ movies: updatedMovies })
        this.props.handleUpdateMovies(updatedMovies)
        this.setState({ editForm: false, editFormMovie: null, editFormMovieIdx: null })
    }

    handleDeleteMovie = async (movieId, movieIdx) => {
        let movie = await movieService.movieDelete(movieId)
        console.log(movie)
        let deleteMovie = [...this.state.movies]
        deleteMovie.splice(movieIdx, 1)
        let updatedMovies = deleteMovie
        this.setState({ movies: updatedMovies })
        this.props.handleUpdateMovies(updatedMovies)
    }

    render() {
        if (!this.state.movies) {
            return <div>loading...</div>
        }
        let createFormClassName = this.state.createForm ? 'row' : 'hide'
        let editFormClassName = this.state.editForm ? 'row' : 'hide'
        let movies = this.state.movies.map((movie, idx) => (
            <li key={idx}><p>{movie.posterImg}, {movie.name}, {movie.description}</p><button onClick={() => this.handleEditForm(movie, idx)}>Edit Movie</button><button onClick={() => this.handleDeleteMovie(movie._id, idx)}>Delete Movie</button></li>
        ))
        if (!this.state.editFormMovie) {
            return (
                <div>
                    <ul>{movies}</ul>
                    <button name='addForm' onClick={this.handleCreateForm}>Add a Movie</button>
                    <MovieCreateForm
                        {...this.props}
                        handleAddMovie={this.handleAddMovie}
                        createFormClassName={createFormClassName}
                    />
                </div>
            )
        }
        return (
            <div>
                <MovieEditForm
                    {...this.props}
                    editFormClassName={editFormClassName}
                    editFormMovie={this.state.editFormMovie}
                    editFormMovieIdx={this.state.editFormMovieIdx}
                    handleEditForm={this.handleEditForm}
                    handleEditMovie={this.handleEditMovie}
                />
            </div >
        )
    }
}

export default AdminPage