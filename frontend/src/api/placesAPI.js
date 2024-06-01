import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//create/add new place
export const createPlace = async (tripId, body) => {
  try {
    const trip = await axios.post(`${BASE_URL}/places`, { ...body, tripId });
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};
