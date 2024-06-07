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
    const id = payload.id;
    req._id = id;
    // console.log('From auth ', req._id);
    next();
  } catch (err) {
    next({ message: err.message, status: 403 });
  }
};

module.exports = requireAuth;
