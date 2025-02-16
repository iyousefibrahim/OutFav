const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required!'],
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product ID is required!'],
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        trim: true,
        maxlength: 100,
        minlength: 5,
    },
    review: {
        type: String,
        required: [true, 'Review is required!'],
        trim: true,
        maxlength: 500,
        minlength: 10,
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: 1,
        max: 5,
        default: 5,
    },
}, {
    versionKey: false,
    timestamps: true,
}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;