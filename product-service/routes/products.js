const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { createProductValidation } = require('../validators/productValidator');
const { validate } = require('../validators/validate');

router.post('/', createProductValidation, validate, ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getByIdProducts)
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
