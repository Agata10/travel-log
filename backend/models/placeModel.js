const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: String,
    date: {
      type: Date,
      index: true,
    },
    img: String,
    description: String,
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Place', placeSchema);
