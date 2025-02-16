const express = require('express');
const router = express.Router();
const addressController = require('../controllers/address.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/', verifyToken, addressController.createAddress);
router.get('/', verifyToken, addressController.getAddressByUserId);
router.put('/:id', verifyToken, addressController.updateAddressByAddressId);
router.delete('/:id', verifyToken, addressController.deleteAddressByAddressId);

module.exports = router;