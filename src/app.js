require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect to MongoDB (reads MONGO_URI from .env)
connectDB(process.env.MONGO_URI);

// Built-in middlewares
app.use(helmet()); // set secure headers
app.use(express.json()); // parse JSON bodies
app.use(cors()); // enable CORS

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Simple rate limiter to avoid abuse (tunable)
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100
});
app.use(limiter);

// Routes
app.use('/api/users', authRoutes);
app.use('/api/books', bookRoutes);

// Health check
app.get('/', (req, res) => res.json({ success: true, message: 'Book Catalog API is running' }));

// Error handler last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
