const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);
router.post('/admin/login', authController.adminLogin);
router.post('/admin/check-admin', authController.checkAdmin);

module.exports = router;