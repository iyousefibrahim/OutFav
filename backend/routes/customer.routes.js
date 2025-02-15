const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');

router.get('/', verifyToken, verifyRole('admin'), customerController.getAllCustomers);

module.exports = router;