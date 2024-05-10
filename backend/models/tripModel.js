const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    img: String,
    description: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    budget: {
      type: Number,
      default: 0.0,
    },
    places: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    favPlaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
      },
    ],
  },
  { timestamps: true }
);

// tripSchema.index({ userId: 1, _id: 1 }, { unique: true });

module.exports = mongoose.model('Trip', tripSchema);
