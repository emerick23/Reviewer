import tokenService from "./tokenService";

const BASE_URL = '/api/reviews/'

function reviewCreate(movieId, review) {
    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        },
        body: JSON.stringify({movieId, review})
    }
    return fetch(BASE_URL, options).then(res => res.json())
}

export default {
    reviewCreate
}