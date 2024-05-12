const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const genereteToken = (_id) => {
  const payload = { id: _id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
};

module.exports.signup = async (req, res, next) => {
  try {
    const userIsFound = await User.findOne({ email: req.body.email });
    if (userIsFound) {
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

module.exports.login = async (req, res, next) => {
  try {
    const userIsFound = await User.findOne({ email: req.body.email });
    if (!userIsFound) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isPassValid = await bcrypt.compare(
      req.body.password,
      userIsFound.password
    );
    if (!isPassValid) {
      return res.status(400).json({ error: 'Password does not match' });
    }
    //create token
    const token = genereteToken(userIsFound._id);
    res.json({ email: userIsFound.email, token });
  } catch (err) {
    next(err);
  }
};
