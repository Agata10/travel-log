import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};
//get user
export const getUser = async () => {
  try {
    const user = await axios.get(`${BASE_URL}/users`, { headers });
    return user.data;
  } catch (error) {
    console.error(error.message);
  }
};
