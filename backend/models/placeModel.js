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
    date: Date,
    img: String,
    description: String,
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Place', placeSchema);
