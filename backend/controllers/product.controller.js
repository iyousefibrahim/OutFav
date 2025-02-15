const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const cloudinary = require('cloudinary').v2;

exports.getAllProducts = asyncWrapper(async (req, res, next) => {
    const products = await Product.find({});
    if (products.length === 0) {
        const error = new AppError('No products found', 404);
        return next(error);
    }
    res.status(200).json({
        status: 'success',
        data: products,
    });
});

exports.getProductById = asyncWrapper(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        const error = new AppError('Product not found', 404);
        return next(error);
    }
    res.status(200).json({
        status: 'success',
        data: product,
    });
});

exports.createProduct = asyncWrapper(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Please upload an image', 400));
    }

    const product = await Product.create({
        title: req.body.title,
        price: req.body.price,
        sizes: req.body.sizes,
        stockStatus: req.body.stockStatus,
        description: req.body.description,
        category: req.body.category,
        productImage: req.file.path, 
        colors: req.body.colors,
        availableQuantity: req.body.availableQuantity
    });

    res.status(201).json({
        status: 'success',
        data: product,
    });
});

exports.updateProduct = asyncWrapper(async (req, res, next) => {
    const requiredFields = [
        'title',
        'price',
        'sizes',
        'stockStatus',
        'description',
        'category',
        'productImage',
        'colors',
        'availableQuantity'
    ];

    const missingFields = requiredFields.filter(field => !(field in req.body));

    if (missingFields.length > 0) {
        return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    res.status(200).json({
        status: 'success',
        data: product,
    });
});

exports.deleteProduct = asyncWrapper(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null,
    });
});