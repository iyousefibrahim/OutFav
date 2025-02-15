const Category = require('../models/category.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.getAllCategories = asyncWrapper(async (req, res, next) => {
    const categories = await Category.find().populate('products');

    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});

exports.getCategory = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const categories = await Category.find().populate('products');
    const category = categories.find(category => category.id === id);
    
    if (!category) {
        return next(AppError.create('Category not found!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            category
        }
    });
});

exports.createCategory = asyncWrapper(async (req, res, next) => {
    if (!req.file) {
        return next(new AppError('Please upload an image', 400));
    }

    const category = await Category.create({
        name: req.body.name,
        description: req.body.description,
        categoryImage: req.file.path,
    });

    res.status(201).json({
        status: 'success',
        data: {
            category
        }
    });
});