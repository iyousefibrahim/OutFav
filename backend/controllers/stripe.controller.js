const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const AppError = require('../utils/appError');
const asyncWrapper = require('../middlewares/asyncWrapper');

exports.createCheckoutSession = asyncWrapper(async (req, res, next) => {

    const { products } = req.body;

    if (!products || products.length === 0) {
        return next(AppError.create('Please provide products to checkout!', 400));
    }

    const line_items = products.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.title,
                description: product.description,
            },
            unit_amount: product.price * 100,
        },
        quantity: quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `http://localhost/3200/success`,
        cancel_url: `http://localhost/3200/cancel`,
    });

    res.status(200).json({
        status: 'success',
        url: session.url,
    });
});

