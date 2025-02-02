const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');

// Enable logging in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

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