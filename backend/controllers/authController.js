const User = require('../models/userModel');

module.exports.signup = async (req, res, next) => {
  try {
    const result = await User.create(...req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
