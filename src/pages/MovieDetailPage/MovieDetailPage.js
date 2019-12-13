import React from 'react'

const MovieDetailPage = (props) => {
    let movie = props.movies[props.match.params.idx]
    return (
        <div>
            <p>{movie.posterImg}</p>
            <p>{movie.name}</p>
            <p>{movie.description}</p>
        </div>
    )
}

export default MovieDetailPage