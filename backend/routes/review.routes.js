const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, reviewController.getAllReviews);
router.get('/:productId', verifyToken, reviewController.getProductReviewsByProductId);
router.post('/', verifyToken, reviewController.createProductReview);

module.exports = router;