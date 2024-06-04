import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//create/add new expense
export const createExpense = async (body) => {
  try {
    const expense = await axios.post(`${BASE_URL}/expenses`, body);
    return expense.data;
  } catch (error) {
    console.error(error.message);
  }
};

//delete expense
export const deleteExpense = async (expenseId) => {
  try {
    const expense = await axios.delete(`${BASE_URL}/expenses/${expenseId}`);
    return expense.data;
  } catch (error) {
    console.error(error.message);
  }
};
