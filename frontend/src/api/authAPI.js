import axios from 'axios';
const BASE_URL = import.meta.env.VITE_AUTH_URL;

export const signup = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, body);
    if (response.status !== 200) {
      throw new Error('Invalid request');
    }
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: err.response.data.error };
  }
};

export const login = async (body) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, body);
    if (response.status !== 200) {
      throw new Error('Invalid request');
    }
    return response.data;
  } catch (err) {
    console.error(err);
    return { error: err.response.data.error };
  }
};
