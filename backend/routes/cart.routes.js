const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, cartController.getAllCart);
router.post('/', verifyToken, cartController.addToCart);
router.put('/', verifyToken, cartController.updateCartProductQuantity);
router.delete('/:productId', verifyToken, cartController.deleteProductFromCart);
router.delete('/', verifyToken, cartController.clearCart);

module.exports = router;