import React, { Component } from 'react'
import MovieCreateForm from '../../components/MovieCreateForm/MovieCreateForm'
import movieService from '../../utils/movieService'
import MovieEditForm from '../../components/MovieEditForm/MovieEditForm'
import './AdminPage.css'

class AdminPage extends Component {

    state = {
        movies: null,
        createForm: false,
        editForm: false,
        editFormMovie: null,
        editFormMovieIdx: null
    }

    async componentDidMount() {
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
            <tr key={idx}>
                <td>{movie.name}</td>
                <td><button className='btn' onClick={() => this.handleEditForm(movie, idx)}><i className="material-icons">edit</i></button></td>
                <td><button className='btn' onClick={() => this.handleDeleteMovie(movie._id, idx)}><i className="material-icons">delete</i></button></td>
            </tr>
        ))
        if (this.state.editFormMovie) {
            return (
                <div className='AdminPage container'>
                    <div className='section'>
                        <h4>Edit - {this.state.editFormMovie.name}</h4>
                        <div className='divider divideLine'></div>
                    </div>
                    <MovieEditForm
                        {...this.props}
                        editFormClassName={editFormClassName}
                        editFormMovie={this.state.editFormMovie}
                        editFormMovieIdx={this.state.editFormMovieIdx}
                        handleEditForm={this.handleEditForm}
                        handleEditMovie={this.handleEditMovie}
                    />
                </div>
            )
        } else if (this.state.createForm) {
            return (
                <div className='AdminPage container'>
                    <div className='section'>
                        <h4>Add Movie</h4>
                        <div className='divider divideLine'></div>
                    </div>
                    <MovieCreateForm
                        {...this.props}
                        handleAddMovie={this.handleAddMovie}
                        createFormClassName={createFormClassName}
                        handleCreateForm={this.handleCreateForm}
                    />
                </div>
            )
        } else {
            return (
                <div className='AdminPage container'>
                    <div className='section'>
                        <h4>Admin Page</h4>
                        <div className='divider divideLine'></div>
                    </div>
                    <button className='btn' name='addForm' onClick={this.handleCreateForm}><i className="material-icons left">add</i>Add Movie</button>
                    <table className='striped centered'>
                        <thead>
                            <tr>
                                <th>Movie Name</th>
                                <th>Edit Movie</th>
                                <th>Delete Movie</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default AdminPage