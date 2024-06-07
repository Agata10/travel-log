import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//get user
export const getUser = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const user = await axios.get(`${BASE_URL}/users`, { headers });
    return user.data;
  } catch (error) {
    console.error(error.message);
  }
};
