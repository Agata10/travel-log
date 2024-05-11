const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

module.exports = mongoose.model('Expense', expenseSchema);
