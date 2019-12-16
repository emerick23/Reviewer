import React from 'react'
import { Link } from 'react-router-dom'
import './MoviesIndexPage.css'

const MoviesIndexPage = props => {
    // let avgRatingArray = props.movies.map(movie => {
    //     let reviews = movie.reviews
    //     let ratings = reviews.map(review => review.rating)
    //     let avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length
    //     return avgRating
    // })
    let movies = props.movies.map((movie, idx) => (
        <Link to={{ pathname: `/movies/${idx}` }} key={idx}>
            <div className="col s12 m6 l3">
                <div className='movieCards' style={{backgroundImage: `url("${movie.posterImg}")`, marginBottom:'20px'}}>
                    <div className="card medium transparent z-depth-5"></div>
                </div>
            </div>
        </Link >
    ))
    return (
        <div className='MoviesIndexPage'>
            <div className='row'>
                {movies}
            </div>
        </div>
    )
}

export default MoviesIndexPage