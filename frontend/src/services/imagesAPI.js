import axios from 'axios';

export const fetchImages = async (place) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${place}&orientation=landscape&client_id=${
        import.meta.env.VITE_PHOTOS_API_KEY
      }`
    );
    return response.data.results[2].urls.regular;
  } catch (err) {
    console.log(err);
  }
};

// Download image as Blob
export const convertURLtoBlob = async (url) => {
  try {
    const response = await axios.get(url, { responseType: 'blob' });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
