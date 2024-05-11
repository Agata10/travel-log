const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      require: true,
    },
    amount: {
      type: Number,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      enum: [
        'Flights',
        'Lodging',
        'Car rental',
        'Transit',
        'Food',
        'Sightseeing',
        'Other',
      ],
      default: 'Other',
    },
  },
  { timestamps: true }
);
