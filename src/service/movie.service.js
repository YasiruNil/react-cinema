import axios from 'axios';
const API_KEY = process.env.REACT_APP_SECRET;
const REQUEST_URL = 'https://api.themoviedb.org/3';

export const movieApi = async (data) => {
  try {
    const { type, page } = data;
    const respose = await axios.get(`${REQUEST_URL}/movie/${type}?api_key=${API_KEY}&language=en-US&page=${page}`);
    return respose;
  } catch (err) {
    return err;
  }
};
