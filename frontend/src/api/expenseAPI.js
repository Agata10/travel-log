import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//create/add new expense
export const createExpense = async (body) => {
  try {
    const expense = await axios.post(`${BASE_URL}/expenses`, body);
    console.log(expense);
    return expense.data;
  } catch (error) {
    console.error(error.message);
  }
};
