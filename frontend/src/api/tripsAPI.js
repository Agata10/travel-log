import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getTrips = async (setTrips) => {
  try {
    const response = await axios(`${BASE_URL}/trips/6637f3825bfc1879d0f2273d`);
    setTrips(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

export const createTrip = async (setTripAdded, body) => {
  try {
    await axios.post(`${BASE_URL}/trips`, body);
    setTripAdded((prev) => !prev);
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteTrip = async (setTripAdded, id) => {
  try {
    await axios.delete(`${BASE_URL}/trips/${id}`);
    setTripAdded((prev) => !prev);
  } catch (error) {
    console.error(error.message);
  }
};
