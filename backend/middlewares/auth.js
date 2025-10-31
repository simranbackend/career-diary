const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
      return res.status(401).json({ status: false, message: 'No token provided' });
    }

    const parts = authHeader.split(' ');
    const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : authHeader;

    if (!token) {
      return res.status(401).json({ status: false, message: 'No token provided' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Verify token matches the one stored in DB for this user (server-side revocation)
  const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ status: false, message: 'Invalid token (user not found)' });

    if (!user.token || user.token !== token) {
      return res.status(401).json({ status: false, message: 'Token revoked or does not match' });
    }

    req.user = { id: payload.id, mobile: payload.mobile };
    next();
  } catch (error) {
    console.error('Auth middleware error', error);
    return res.status(401).json({ status: false, message: 'Invalid or expired token' });
  }
};
