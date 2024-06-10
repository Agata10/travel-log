import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_PROD_URL;

//create/add new expense
export const createExpense = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const expense = await axios.post(`${BASE_URL}/expenses`, body, { headers });
    return expense.data;
  } catch (error) {
    console.error(error.message);
  }
};

//delete expense
export const deleteExpense = async (expenseId) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const expense = await axios.delete(`${BASE_URL}/expenses/${expenseId}`, {
      headers,
    });
    return expense.data;
  } catch (error) {
    console.error(error.message);
  }
};
