import tokenService from "./tokenService";

const BASE_URL = '/api/movies/';

function moviesIndex() {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }
    return fetch(BASE_URL, options).then(res => res.json())
}

function movieCreate(movie) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({movie})
    }
    return fetch(BASE_URL, options).then(res => res.json())
}

function movieEdit(movie, movieId) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({movie})
    }
    return fetch(BASE_URL + movieId, options).then(res => res.json())
}

function movieDelete(movieId) {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }
    return fetch(BASE_URL + movieId, options).then(res => res.json())
}

export default {
    moviesIndex,
    movieCreate,
    movieEdit,
    movieDelete
}
