var Movie = require('../models/movie')

async function index(req, res) {
    const movies = await Movie.find({})
    res.json(movies)
}

async function movieCreate(req, res) {
    try {
        const movie = await new Movie(req.body.movie)
        movie.save()
        res.json(movie)
    } catch (err) {
        res.json({err})
    }
}

async function movieEdit(req, res) {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body.movie, {new: true})
        movie.save()
        res.json(movie)
    } catch (err) {
        res.json({err})
    }
}

async function movieDelete(req, res) {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id)
        movie.save()
        res.json('Movie sucessfully deleted')
    } catch (err) {
        res.json({err})
    }
}

module.exports = {
    index,
    movieCreate,
    movieEdit,
    movieDelete
}