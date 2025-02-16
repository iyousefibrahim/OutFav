const Address = require('../models/address.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.createAddress = asyncWrapper(async (req, res, next) => {
    const { orderId, address, city, phoneNumber } = req.body;

    const addressData = await Address.create({
        orderId,
        userId: req.user.id,
        address,
        city,
        phoneNumber,
    });

    res.status(201).json({
        status: 'success',
        data: {
            addressData
        }
    });
});

exports.getAddressByUserId = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;

    if (!userId) {
        return next(AppError.create('User ID is required!', 400));
    }

    const addresses = await Address.find({ userId });

    sanitizedAddresses = addresses.map(address => {
        return {
            addressId: address._id,
            orderId: address.orderId,
            userId: address.userId,
            address: address.address,
            city: address.city,
            phoneNumber: address.phoneNumber,
        };
    });

    if (addresses.length === 0) {
        return next(AppError.create('No addresses found for this user!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { sanitizedAddresses }
    });
});

exports.updateAddressByAddressId = asyncWrapper(async (req, res, next) => {

    const { address, city, phoneNumber } = req.body;

    const addressData = await Address.findByIdAndUpdate(req.params.id, {
        address,
        city,
        phoneNumber,
    }, { new: true, runValidators: true });

    if (!addressData) {
        return next(AppError.create('No address found with this ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            addressData
        }
    });
});

exports.deleteAddressByAddressId = asyncWrapper(async (req, res, next) => {
    const addressData = await Address.findByIdAndDelete(req.params.id);

    if (!addressData) {
        return next(AppError.create('No address found with this ID!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});

