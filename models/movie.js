const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    posterImg: String,
    description: String
})

module.exports = mongoose.model('Movie', movieSchema)