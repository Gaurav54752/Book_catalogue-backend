const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Register new user
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already in use.' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        token
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user and return token
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({
      success: true,
      data: {
        user: { id: user._id, name: user.name, email: user.email },
        token
      }
    });
  } catch (err) {
    next(err);
  }
};
