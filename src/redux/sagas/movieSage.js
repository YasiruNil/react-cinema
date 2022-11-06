import { put, takeLatest } from 'redux-saga/effects';
import { movieApi } from '../../service/movie.service';
import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAIL,
  LOAD_MORE_FAIL,
  LOAD_MORE_SUCCESS,
  LOAD_MORE_REQUEST,
  MOVIE_TYPE_CHANGE_REQUEST,
  MOVIE_TYPE_CHANGE_SUCCESS,
  MOVIE_TYPE_CHANGE_FAIL
} from '../action_types/index';
export function* watcherFetchMovies() {
  yield takeLatest(MOVIE_LIST_REQUEST, workerFetchMovies);
}

function* workerFetchMovies(payload) {
  const { moviedata } = payload;
  const result = yield movieApi(moviedata);
  if (result && result.status === 200) {
    yield put({ type: MOVIE_LIST_SUCCESS, response: result.data });
  } else if (result.response.status === 400 || result.response.status === 404) {
    yield put({ type: MOVIE_LIST_FAIL, response: result.message });
  }
}

export function* watcherLoadMoreMovies() {
  yield takeLatest(LOAD_MORE_REQUEST, workerLoadMoreMovies);
}

function* workerLoadMoreMovies(payload) {
  const { moreMovies } = payload;
  const result = yield movieApi(moreMovies);
  if (result && result.status === 200) {
    yield put({ type: LOAD_MORE_SUCCESS, response: result.data });
  } else if (result.response.status === 400 || result.response.status === 404) {
    yield put({ type: LOAD_MORE_FAIL, response: result.message });
  }
}

export function* watcherChangedMovies() {
  yield takeLatest(MOVIE_TYPE_CHANGE_REQUEST, workerChangedMovies);
}

function* workerChangedMovies(payload) {
  const { changedMovies } = payload;
  const result = yield movieApi(changedMovies);
  if (result && result.status === 200) {
    yield put({ type: MOVIE_TYPE_CHANGE_SUCCESS, response: result.data });
  } else if (result.response.status === 400 || result.response.status === 404) {
    yield put({ type: MOVIE_TYPE_CHANGE_FAIL, response: result.message });
  }
}
