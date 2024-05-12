const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//method used before document is saved to db
userSchema.pre('save', async function (next) {
  try {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model('User', userSchema);
