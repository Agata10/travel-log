import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//create/add new place
export const createPlace = async (body) => {
  try {
    const trip = await axios.post(`${BASE_URL}/places`, body);
    console.log(trip);
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
export const deletePlace = async (placeId) => {
  try {
    const trip = await axios.delete(`${BASE_URL}/places/${placeId}`);
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};

//get favorites users places
export const getFavPlaces = async (userId) => {
  try {
    const trip = await axios.get(`${BASE_URL}/places/favorites/${userId}`);
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};
