const Cart = require('../models/cart.model');
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');
const sanitizeCart = require('../utils/sanitizeCart');

exports.getAllCart = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate('products.productId');

    if (!cart) {
        return next(AppError.create('No cart found for this user!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            cart: sanitizeCart(cart)
        }
    });
});

exports.addToCart = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { productId, quantity = 1 } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
        cart = await Cart.create({ userId, products: [{ productId, quantity }] });
    } else {
        const productIndex = cart.products.findIndex(
            (p) => p.productId.toString() === productId
        );

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
    }

    await cart.save();
    await cart.populate('products.productId');

    res.status(200).json({
        status: 'success',
        message: 'Product added successfully to your cart',
        data: {
            cart: sanitizeCart(cart)
        }
    });
});

exports.updateCartProductQuantity = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (quantity < 1) {
        return next(AppError.create('Quantity must be at least 1!', 400));
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return next(AppError.create('No cart found for this user!', 404));
    }

    const cartProduct = cart.products.find((p) => p.productId.toString() === productId);

    if (!cartProduct) {
        return next(AppError.create('Product not found in the cart!', 404));
    }

    cartProduct.quantity = quantity;
    await cart.save();
    await cart.populate('products.productId');

    res.status(200).json({
        status: 'success',
        message: 'Cart updated successfully',
        data: {
            cart: sanitizeCart(cart)
        }
    });
});

exports.deleteProductFromCart = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return next(AppError.create('No cart found for this user!', 404));
    }

    const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
    );

    if (productIndex === -1) {
        return next(AppError.create('Product not found in the cart!', 404));
    }

    cart.products.splice(productIndex, 1);
    await cart.save();

    if (cart.products.length === 0) {
        await Cart.findByIdAndDelete(cart._id);
        return res.status(200).json({
            status: 'success',
            message: 'Product removed successfully from cart',
            data: { cart: null }
        });
    }

    await cart.populate('products.productId');

    res.status(200).json({
        status: 'success',
        message: 'Product removed successfully from cart',
        data: {
            cart: sanitizeCart(cart)
        }
    });
});

exports.clearCart = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return next(AppError.create('No cart found for this user!', 404));
    }

    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({
        status: 'success',
        message: 'Cart cleared successfully',
        data: { cart: null }
    });
});

