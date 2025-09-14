const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (requiresAdmin = false) => async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    if (requiresAdmin && user.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Auth failed' });
  }
};

module.exports = auth;
