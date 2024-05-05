const mongoose = require('mongoose');
const connectionString = process.env.ATLAS_URI || '';

module.exports = async () => {
  try {
    const response = await mongoose.connect(connectionString);
    if (response) {
      console.log('Success, conneted to MongoDB.');
    }
  } catch (err) {
    console.log('Failed to connecet to database:', err);
  }
};
