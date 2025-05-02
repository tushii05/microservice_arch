const { body } = require('express-validator');

exports.createProductValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    body('description').optional().isString(),
    body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];
