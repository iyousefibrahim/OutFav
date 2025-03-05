const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter a title'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must be at most 100 characters long'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    sizes: {
        type: [String],
        enum: ['S', 'M', 'L'],
        required: true
    },
    stockStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description must be at most 1000 characters long'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    productImage: {
        type: String,
        required: [true, 'Please enter an image'],
        trim: true,
    },
    colors: {
        type: [String],
        enum: ['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White'],
        required: true
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Please enter a quantity'],
    },
}, {
    versionKey: false,
    timestamps: true,
}
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;