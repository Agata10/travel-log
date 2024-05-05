const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    startDate: Date,
    endDate: Date,
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
