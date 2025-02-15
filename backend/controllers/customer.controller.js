const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/user.model');

exports.getAllCustomers = asyncWrapper(async (req, res, next) => {

    const users = await User.find({ role: 'user' }, '-password');
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    });
});