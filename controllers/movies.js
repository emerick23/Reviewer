var Movie = require('../models/movie')

async function index(req, res) {
    const movies = await Movie.find({})
    res.json(movies)
}

async function movieCreate(req, res) {
    try {
        console.log(req.body.movie)
        const movie = new Movie(req.body.movie)
        movie.save()
        res.json('Movie created sucessfully')
    } catch (err) {
        res.json({err})
    }
}

module.exports = {
    index,
    movieCreate
}