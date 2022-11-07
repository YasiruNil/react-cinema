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

export const fetchSingleMovieDetails = async (id) => {
  try {
    const respose = await axios.get(`${REQUEST_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    return respose;
  } catch (err) {
    return err;
  }
};

export const fetchSingleMovieCredits = async (id) => {
  try {
    const respose = await axios.get(`${REQUEST_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    return respose;
  } catch (err) {
    return err;
  }
};

export const fetchSingleMovieImages = async (id) => {
  try {
    const respose = await axios.get(`${REQUEST_URL}/movie/${id}/images?api_key=${API_KEY}&language=en-US`);
    return respose;
  } catch (err) {
    return err;
  }
};

export const fetchSingleMovieVideos = async (id) => {
  try {
    const respose = await axios.get(`${REQUEST_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
    return respose;
  } catch (err) {
    return err;
  }
};

export const fetchSingleMovieReviews = async (id, page = 1) => {
  try {
    const respose = await axios.get(`${REQUEST_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`);
    return respose;
  } catch (err) {
    return err;
  }
};
