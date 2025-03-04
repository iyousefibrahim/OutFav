const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyRole = require('../middlewares/verifyRole');
const upload = require('../middlewares/upload');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', verifyToken, verifyRole('admin'), upload.single('categoryImage'), categoryController.createCategory);


module.exports = router;