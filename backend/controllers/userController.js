const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.getUser = async (req, res, next) => {
  try {
    const result = await User.findById(req._id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    let result;

    if (req.body.password) {
      const saltRounds = Number(process.env.SALT_ROUNDS);
      const salt = await bcrypt.genSalt(saltRounds);
      hashedPassword = await bcrypt.hash(req.body.password, salt);
      result = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body, password: hashedPassword },
        {
          new: true,
        }
      );
    } else {
      result = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
