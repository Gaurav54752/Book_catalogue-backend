const { body, param } = require('express-validator');

const createBookValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('publishedYear').optional().isInt({ min: 0 }).withMessage('publishedYear must be a number'),
];

const updateBookValidation = [
  body('title').optional().notEmpty(),
  body('author').optional().notEmpty(),
  body('publishedYear').optional().isInt({ min: 0 })
];

const idParamValidation = [
  param('id').isMongoId().withMessage('Invalid book id')
];

module.exports = { createBookValidation, updateBookValidation, idParamValidation };
