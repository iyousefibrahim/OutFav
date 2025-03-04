const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const upload = require('../middlewares/upload');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', verifyToken, verifyRole('admin'), upload.single('productImage'), productController.createProduct);
router.put('/:id', verifyToken, verifyRole('admin'), productController.updateProduct);
router.delete('/:id', verifyToken, verifyRole('admin'), productController.deleteProduct);

module.exports = router;