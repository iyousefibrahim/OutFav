const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a category name'],
        trim: true,
        minlength: [3, 'Category name must be at least 3 characters long'],
        maxlength: [50, 'Category name must be at most 50 characters long'],
    },
    categoryImage: {
        type: String,
        required: [true, 'Please enter an image'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        trim: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
}, {
    versionKey: false,
}
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;