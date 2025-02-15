const Product = require('../models/product.model');
const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.getAllProducts = asyncWrapper(async (req, res, next) => {
    const products = await Product.find().populate('category', 'name');
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
    const product = await Product.findById(req.params.id).populate('category', 'name');

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

    const category = await Category.findById(req.body.category);
    if (!category) {
        return next(new AppError('Category not found!', 404));
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

    category.products.push(product._id);
    await category.save();

    res.status(201).json({
        status: 'success',
        data: product,
    });
});

exports.updateProduct = asyncWrapper(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }

    if (req.body.category && req.body.category !== product.category.toString()) {
        const newCategory = await Category.findById(req.body.category);
        if (!newCategory) {
            return next(new AppError('New category not found!', 404));
        }

        await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id } });

        newCategory.products.push(product._id);
        await newCategory.save();
    }

    Object.assign(product, req.body);
    await product.save();

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

    await Category.findByIdAndUpdate(product.category, { $pull: { products: product._id } });

    res.status(200).json({
        status: 'success',
        data: null,
    });
});
