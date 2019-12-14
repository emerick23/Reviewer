const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../../controllers/reviews')

// Public Routes



// Protected Routes
router.use(require('../../config/auth'))
router.post('/', reviewsCtrl.reviewCreate)
router.delete('/:id', reviewsCtrl.reviewDelete)

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'})
}

module.exports = router