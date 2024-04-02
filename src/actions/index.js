import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
} from "../components/heroesList/heroesSlice";

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
} from "../components/heroesFilters/filtersSlice";
// HEROES

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

// FILTERS

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters/")
    .then((data) => dispatch(filtersFetched(Object.values(data))))
    .catch(() => dispatch(filtersFetchingError()));
};
