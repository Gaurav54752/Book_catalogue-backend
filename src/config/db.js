const mongoose = require('mongoose');

/**
 * Connect to MongoDB using mongoose.
 * We export a function so the connection can be configured from the app entry.
 */
const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
