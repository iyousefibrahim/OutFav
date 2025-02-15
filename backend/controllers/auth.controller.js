const User = require('../models/user.model');
const asyncWrapper = require('../middlewares/asyncWrapper');
const bcryptjs = require('bcryptjs');
const appError = require('../utils/appError');
const createJWT = require('../utils/createJWT');

exports.register = asyncWrapper(async (req, res, next) => {
    const { name, email, password, address } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return next(new appError('User already exists', 400));
    }

    const hashedPassword = await bcryptjs.hash(password, 12);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        address,
    });

    await user.save();

    const token = await createJWT({ email: user.email, id: user._id, role: user.role });

    user.password = undefined;

    res.status(201).json({
        status: 'success',
        data: { user, token },
    });
});

exports.login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcryptjs.compare(password, user.password))) {
        const error = new appError('Invalid email or password', 401);
        return next(error);
    }

    const token = await createJWT({ email: user.email, id: user._id, role: user.role });

    res.status(200).json({
        status: 'success',
        data: { token },
    });

});

exports.changePassword = asyncWrapper(async (req, res, next) => {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcryptjs.compare(oldPassword, user.password))) {
        const error = new appError('Invalid email or password', 401);
        return next(error);
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
        status: 'success',
        message: 'Password changed successfully',
    });

});

exports.adminLogin = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await bcryptjs.compare(password, user.password)) || user.role !== 'admin') {
        const error = new appError('Invalid email or password', 401);
        return next(error);
    }

    const token = await createJWT({ email: user.email, id: user._id, role: user.role });

    res.status(200).json({
        status: 'success',
        data: { token },
    });
});