var Movie = require('../models/movie')

async function reviewCreate(req, res) {
    try {
        const movie = await Movie.findById(req.body.movieId)
        const newReview = req.body.review
        movie.reviews.push(newReview)
        movie.save()
        res.json(newReview)
    } catch (err) {
        res.json({ err })
    }
}

async function reviewDelete(req, res) {
    try {
        const movie = await Movie.findById(req.body.movieId)
        const updatedReviews = movie.reviews
        movie.reviews.splice(req.params.id, 1)
        movie.save()
        res.json(updatedReviews)
    } catch (err) {
        res.json({ err })
    }
}

module.exports = {
    reviewCreate,
    reviewDelete
}