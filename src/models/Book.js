const mongoose = require('mongoose');

/**
 * Book model
 * - title, author are required
 * - createdBy references the User who added the book
 */
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 200 },
  author: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, default: '' },
  publishedYear: { type: Number },
  genres: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
