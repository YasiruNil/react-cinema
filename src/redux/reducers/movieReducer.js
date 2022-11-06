import {
  MOVIE_LIST_FAIL,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  LOAD_MORE_REQUEST,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_FAIL,
  MOVIE_TYPE_CHANGE_SUCCESS,
  MOVIE_TYPE_CHANGE_FAIL
} from '../action_types/index';
const initialstate = {
  movieList: [],
  error: null,
  loading: false,
  page: 1,
  totalPages: 1,
  halfLoading: false
};

export const movieReducer = (status = initialstate, action) => {
  switch (action.type) {
    case MOVIE_LIST_REQUEST:
      return {
        ...status,
        error: null,
        loading: true,
        movieList: []
      };
    case MOVIE_LIST_SUCCESS:
      return {
        ...status,
        error: null,
        loading: false,
        page: action.response.page,
        movieList: action.response.results,
        totalPages: action.response.total_pages
      };
    case MOVIE_LIST_FAIL:
      return {
        ...status,
        page: 1,
        totalPages: 1,
        movieList: [],
        loading: false,
        error: action.response
      };
    case LOAD_MORE_REQUEST:
      return {
        ...status,
        loading: false,
        halfLoading: true
      };

    case LOAD_MORE_SUCCESS:
      return {
        ...status,
        loading: false,
        halfLoading: false,
        page: action.response.page,
        totalPages: action.response.total_pages,
        movieList: [...status.movieList, ...action.response.results]
      };
    case LOAD_MORE_FAIL:
      return {
        ...status,
        loading: false,
        halfLoading: false,
        movieList: [...status.movieList]
      };

    case MOVIE_TYPE_CHANGE_SUCCESS:
      return {
        ...status,
        loading: false,
        halfLoading: false,
        page: action.response.page,
        movieList: action.response.results,
        totalPages: action.response.total_pages
      };
    case MOVIE_TYPE_CHANGE_FAIL:
      return {
        ...status,
        loading: false,
        halfLoading: false,
        movieList: []
      };

    default:
      return status;
  }
};
