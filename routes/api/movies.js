const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/movies');

// Public Routes
router.get('/', moviesCtrl.index)
router.post('/', moviesCtrl.movieCreate)

// Protected Routes
// router.use(require('../../config/auth'))
// router.post('/', checkAuth, moviesCtrl.movieCreate)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'})
}

module.exports = router