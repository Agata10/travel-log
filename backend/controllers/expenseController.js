const Expense = require('../models/expenseModel');
const Trip = require('../models/tripModel');

//create expense
module.exports.createExpense = async (req, res, next) => {
  try {
    const expense = await Expense.create(req.body);
    //delete it later
    await Trip.findByIdAndUpdate(req.body.tripId, {
      $push: { expenses: expense._id },
    });
    res.json(expense);
  } catch (err) {
    next(err);
  }
};

//update expanse
module.exports.updateExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(expense);
  } catch (err) {
    next(err);
  }
};

//delete expanse
module.exports.deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    //delete it later
    await Trip.findByIdAndUpdate(expense.tripId, {
      $pull: { expenses: req.params.id },
    });
    res.json(expense);
  } catch (err) {
    next(err);
  }
};
