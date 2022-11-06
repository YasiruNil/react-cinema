import { createSelector } from 'reselect';

const movie = (state) => state.movie;

export const selectMovieLists = createSelector([movie], (item) => item);
