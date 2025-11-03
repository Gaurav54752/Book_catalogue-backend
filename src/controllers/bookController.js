const Book = require('../models/Book');

/**
 * Create a new book (protected)
 */
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, description, publishedYear, genres } = req.body;
    const book = await Book.create({
      title,
      author,
      description,
      publishedYear,
      genres,
      createdBy: req.user._id
    });
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

/**
 * Public: list all books
 */
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('createdBy', 'name email');
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
};

/**
 * Public: get a single book by id
 */
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('createdBy', 'name email');
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

/**
 * Update book (protected) - only owner allowed
 */
exports.updateBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this book' });
    }

    Object.assign(book, req.body);
    const updated = await book.save();
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete book (protected) - only owner allowed
 */
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

    if (book.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this book' });
    }

    await book.remove();
    res.json({ success: true, message: 'Book removed' });
  } catch (err) {
    next(err);
  }
};
