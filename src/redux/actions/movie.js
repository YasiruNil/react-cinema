import { LOAD_MORE_REQUEST, MOVIE_LIST_REQUEST, MOVIE_TYPE_CHANGE_REQUEST } from '../action_types/index';

export const fetchMovies = (moviedata) => ({
  type: MOVIE_LIST_REQUEST,
  moviedata
});

export const loadMoreMovies = (moreMovies) => ({
  type: LOAD_MORE_REQUEST,
  moreMovies
});

export const fetchChangedMovies = (changedMovies) => ({
  type: MOVIE_TYPE_CHANGE_REQUEST,
  changedMovies
});
