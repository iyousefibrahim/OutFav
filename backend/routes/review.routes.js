const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');

router.get('/', verifyToken, verifyRole('admin'), reviewController.getAllReviews);
router.get('/:productId', verifyToken, reviewController.getProductReviewsByProductId);
router.post('/', verifyToken, reviewController.createProductReview);
router.put('/:id', verifyToken, reviewController.updateReview);
router.delete('/:id', verifyToken, reviewController.deleteReview);

module.exports = router;