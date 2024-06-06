import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//get user
export const getUser = async () => {
  try {
    const user = await axios.get(`${BASE_URL}/users`);
    return user.data;
  } catch (error) {
    console.error(error.message);
  }
};
