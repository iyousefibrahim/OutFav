const Review = require('../models/review.model');
const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.getAllReviews = asyncWrapper(async (req, res, next) => {
    const reviews = await Review.find();

    res.status(200).json({
        status: 'success',
        data: reviews,
    });
});

exports.getProductReviewsByProductId = asyncWrapper(async (req, res, next) => {
    const reviews = await Review.find({ productId: req.params.productId });

    res.status(200).json({
        status: 'success',
        data: reviews,
    });
});

exports.createProductReview = asyncWrapper(async (req, res, next) => {

    const review = await Review.create({
        userId: req.user.id,
        productId: req.body.productId,
        title: req.body.title,
        review: req.body.review,
        rating: req.body.rating,
    });

    res.status(201).json({
        status: 'success',
        data: review,
    });
});