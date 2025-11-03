const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const validateRequest = require('../middlewares/validateRequest');
const { createBook, getAllBooks, getBookById, updateBook, deleteBook } = require('../controllers/bookController');
const { createBookValidation, updateBookValidation, idParamValidation } = require('../validators/bookValidators');

// Public routes
router.get('/', getAllBooks);
router.get('/:id', idParamValidation, validateRequest, getBookById);

// Protected routes (require JWT)
router.post('/', auth, createBookValidation, validateRequest, createBook);
router.put('/:id', auth, idParamValidation, updateBookValidation, validateRequest, updateBook);
router.delete('/:id', auth, idParamValidation, validateRequest, deleteBook);

module.exports = router;
