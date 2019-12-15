const express = require('express');
const router = express.Router();
const moviesCtrl = require('../../controllers/movies');

// Public Routes
router.get('/', moviesCtrl.index)


// Protected Routes
router.use(require('../../config/auth'))
router.post('/', checkAuth, moviesCtrl.movieCreate)
router.put('/:id', checkAuth, moviesCtrl.movieEdit)
router.delete('/:id', checkAuth, moviesCtrl.movieDelete)

function checkAuth(req, res, next) {
    if (req.user.isAdmin) return next();
    return res.status(401).json({msg: 'Not Authorized'})
}

module.exports = router