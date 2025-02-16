const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const cors = require('cors');
const compression = require('compression');

// Security Middlewares
const helmet = require('helmet');
const xssClean = require('xss-clean');
const rateLimiter = require('./middlewares/rateLimiter');

// Importing Routes
const userRouter = require('./routes/auth.routes');
const productRouter = require('./routes/product.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');
const customerRouter = require('./routes/customer.routes');
const reviewRouter = require('./routes/review.routes');
const addressRouter = require('./routes/address.routes');
const stripeRouter = require('./routes/payment.routes');

// Enable CORS
app.use(cors());

// Use helmet for securing HTTP headers
app.use(helmet());

// Use compression for response body compression
app.use(compression());

// Use xss-clean to prevent XSS attacks
app.use(xssClean());

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

// Rate limiter middleware
app.use(rateLimiter);

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
app.use('/api/v1/payment', stripeRouter);


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