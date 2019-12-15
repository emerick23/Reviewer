const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, default: 1, min: 1, max: 5 },
    comment: String,
    userId: String
})


const movieSchema = new mongoose.Schema({
    posterImg: String,
    name: String,
    description: String,
    reviews: [reviewSchema]
})

module.exports = mongoose.model('Movie', movieSchema)