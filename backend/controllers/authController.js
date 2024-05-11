const User = require('../models/userModel');

module.exports.signup = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const result = await User.create({ ...req.body });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
