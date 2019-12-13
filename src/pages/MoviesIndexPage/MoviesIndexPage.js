import React, { Component } from 'react'
import movieService from '../../utils/movieService'
import { Link } from 'react-router-dom'

const MoviesIndexPage = props => {
    let movies = props.movies.map((movie, idx) => (
        <Link to={{ pathname: `/movies/${idx}` }} key={idx}>
            <div className='col s6 m4 l3'>
                <div className='hoverable card small blue-grey lighten-4'>
                    <div className='card-content'>
                        <span className='card-title truncate'>{movie.name}</span>
                    </div>
                </div>
            </div>
        </Link>
    ))
    return (
        <div>
            <div className='row'>
                {movies}
            </div>
        </div>
    )
}

export default MoviesIndexPage