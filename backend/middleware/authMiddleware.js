const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    next({ message: 'Authorization token required', status: 401 });
    return;
  }
  const token = authorization.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const _id = payload._id;
    req._id = await User.findOne({ _id }).select('_id');
    next();
  } catch (err) {
    next({ message: err.message, status: 403 });
  }
};

module.exports = requireAuth;
