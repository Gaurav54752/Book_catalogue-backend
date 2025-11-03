const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const validateRequest = require('../middlewares/validateRequest');

// POST /api/users/register
router.post('/register', registerValidation, validateRequest, register);

// POST /api/users/login
router.post('/login', loginValidation, validateRequest, login);

module.exports = router;
