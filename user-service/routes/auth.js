const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { registerValidation, loginValidation } = require('../validators/authValidator');
const { validate } = require('../validators/validate');

router.post('/register', registerValidation, validate, UserController.register);
router.post('/login', loginValidation, validate, UserController.login);

module.exports = router;
