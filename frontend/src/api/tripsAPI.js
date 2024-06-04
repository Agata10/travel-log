import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

//get all trips
export const getTrips = async () => {
  try {
    const response = await axios(`${BASE_URL}/trips/6637f3825bfc1879d0f2273d`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

//create single trip
export const createTrip = async (body) => {
  try {
    const trip = await axios.post(`${BASE_URL}/trips`, body);
    return trip.data;
  } catch (error) {
    console.error(error.message);
  }
};

//get trip
export const getSingleTrip = async (tripId) => {
  try {
    const response = await axios.get(`${BASE_URL}/trips/trip/${tripId}`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

//update trip
export const updateTrip = async (tripId, body) => {
  try {
    const response = await axios.put(`${BASE_URL}/trips/${tripId}`, body);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

//delete trip
export const deleteTrip = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/trips/${id}`);
    return;
  } catch (error) {
    console.error(error.message);
  }
};

//get trip places to visit
export const getPlacesToVisit = async (tripId) => {
  try {
    const response = await axios(`${BASE_URL}/trips/${tripId}/places`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

//get trip expenses
export const getTripExpenses = async (tripId) => {
  try {
    const response = await axios(`${BASE_URL}/trips/${tripId}/expenses`);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

//get trip places by day
export const getPlacesByDate = async (date, tripId) => {
  try {
    const place = await axios.get(`${BASE_URL}/trips/${tripId}/places/${date}`);
    return place.data;
  } catch (error) {
    console.error(error.message);
  }
};
