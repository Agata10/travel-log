const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

//create expense
router.post('/', expenseController.createExpense);

//update expanse
router.put('/:id', expenseController.updateExpense);

//delete expanse
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
