const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', verifyToken, authController.changePassword);
router.post('/admin/login', authController.adminLogin);

module.exports = router;