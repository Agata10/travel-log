import axios from 'axios';

const optionsBasic = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_TRAVEL_API_KEY,
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
  },
};

const restaurant_url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
const hotel_url =
  'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary';
const attraction_url =
  'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary';

export const getRestaurants = async (bounds) => {
  console.log(bounds);
  const options = {
    method: optionsBasic.method,
    url: restaurant_url,
    params: {
      limit: '20',
      currency: 'USD',
      bl_latitude: String(bounds.bl_latitude),
      tr_latitude: String(bounds.tr_latitude),
      bl_longitude: String(bounds.bl_longitude),
      tr_longitude: String(bounds.tr_longitude),
      restaurant_tagcategory_standalone: '10591',
      restaurant_tagcategory: '10591',
      open_now: 'false',
      lunit: 'km',
      lang: 'en_US',
    },
    headers: optionsBasic.headers,
  };
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHotels = async (bounds) => {
  const options = {
    method: optionsBasic.method,
    url: hotel_url,
    params: {
      bl_latitude: String(bounds.bl_latitude),
      tr_latitude: String(bounds.tr_latitude),
      bl_longitude: String(bounds.bl_longitude),
      tr_longitude: String(bounds.tr_longitude),
      limit: '20',
      currency: 'USD',
      subcategory: 'hotel,bb,specialty',
      adults: '1',
    },
    headers: optionsBasic.headers,
  };
  try {
    const response = await axios.request(options);
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAttractions = async (bounds) => {
  const options = {
    method: optionsBasic.method,
    url: attraction_url,
    params: {
      bl_latitude: String(bounds.bl_latitude),
      tr_latitude: String(bounds.tr_latitude),
      bl_longitude: String(bounds.bl_longitude),
      tr_longitude: String(bounds.tr_longitude),
      limit: '20',
      currency: 'USD',
      lunit: 'km',
      lang: 'en_US',
    },
    headers: optionsBasic.headers,
  };
  try {
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
