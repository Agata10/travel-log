const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name required'],
    },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email required'],
      validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minLength: [8, 'Minimum password length is 8 characters'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
