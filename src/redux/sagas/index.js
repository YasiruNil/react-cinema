import { all, fork } from 'redux-saga/effects';
import { watcherFetchMovies as fetchMovies, watcherLoadMoreMovies as loadMoreMovies, watcherFetchMovieDetails as fetchMovieDetails } from './movieSage';
// import { watcherJobVacanciesList as JobVacanciesList } from "./jobVacanciesSaga"
//  generator funnction
// saga is to handle side effects like data fetching.its in a seperate thread
// handle async function(used to make the async code look more sync)
// watcher -watch any action dispatch to the store if any matches they assign it to worker saga
export default function* rootSaga() {
  yield all([fork(fetchMovies), fork(loadMoreMovies), fork(fetchMovieDetails)]);
}
