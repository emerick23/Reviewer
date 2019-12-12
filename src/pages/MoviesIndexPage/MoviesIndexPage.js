import React, { Component } from 'react'
import movieService from '../../utils/movieService'

class MoviesIndexPage extends Component {

    async componentDidMount() {
        const movies = await movieService.moviesIndex()
        this.props.handleUpdateMovies(movies)
    }

    render() {
        let movies = this.props.movies.map( (movie, idx) => (
            <div key={idx}>
                <p>{movie.posterImg}</p>
                <p>{movie.description}</p>
            </div>
        ))
        return (
            <div>
                {movies}
            </div>
        )
    }
}

export default MoviesIndexPage