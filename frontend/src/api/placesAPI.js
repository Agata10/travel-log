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

//update place
export const updatePlace = async (placeId, body) => {
  try {
    const trip = await axios.put(`${BASE_URL}/places/${placeId}`, body);
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};

//delete place
export const deletePlace = async (tripId, placeId) => {
  try {
    const trip = await axios.delete(`${BASE_URL}/places/${placeId}`, {
      data: { tripId },
    });
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};
