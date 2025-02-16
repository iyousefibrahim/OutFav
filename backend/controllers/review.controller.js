const Review = require('../models/review.model');
const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.getAllReviews = asyncWrapper(async (req, res, next) => {
    const reviews = await Review.find();
    sanitizedReviews = reviews.map(review => {
        return {
            reviewId: review._id,
            userId: review.userId,
            productId: review.productId,
            title: review.title,
            review: review.review,
            rating: review.rating,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        }
    });

    res.status(200).json({
        status: 'success',
        data: sanitizedReviews,
    });
});

exports.getProductReviewsByProductId = asyncWrapper(async (req, res, next) => {
    const reviews = await Review.find({ productId: req.params.productId });
    sanitizedReviews = reviews.map(review => {
        return {
            reviewId: review._id,
            userId: review.userId,
            productId: review.productId,
            title: review.title,
            review: review.review,
            rating: review.rating,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
        }
    });

    res.status(200).json({
        status: 'success',
        data: sanitizedReviews,
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

exports.updateReview = asyncWrapper(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: review,
    });
});

exports.deleteReview = asyncWrapper(async (req, res, next) => {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
        return next(new AppError('Review not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null,
    });
});