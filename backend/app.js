const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');

// Importing Routes
const userRouter = require('./routes/auth.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');
const customerRouter = require('./routes/customer.routes');
const reviewRouter = require('./routes/review.routes');
const addressRouter = require('./routes/address.routes');

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.write('Welcome to OutFav API!');
    res.end();
});

// Mounting Routes
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/admin/customers', customerRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/address', addressRouter);


// Global Middleware for not found routes
app.all('*', (req, res, next) => {
    next(AppError.create(`This route ${req.originalUrl} is not available on this server!`, 404));
});

// Global Error Middleware
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message || 'Something went wrong!',
    });
});

module.exports = app;