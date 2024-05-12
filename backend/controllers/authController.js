const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const genereteToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

module.exports.signup = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const user = await User.create(req.body);
    //create token
    const token = genereteToken(user._id);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
