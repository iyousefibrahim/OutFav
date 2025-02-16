const express = require('express');
const router = express.Router();
const stripeController = require('../controllers/stripe.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, stripeController.createCheckoutSession);

module.exports = router;