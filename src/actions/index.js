// HEROES

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};
// ADD HERO

export const heroAdd = (hero) => {
  return {
    type: "HERO_ADD",
    payload: hero,
  };
};

// DELETE HERO

export const heroDelete = (id) => {
  return {
    type: "HERO_DELETE",
    payload: id,
  };
};

// FILTERS

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3001/filters/")
    .then((data) => dispatch(filtersFetched(Object.values(data))))
    .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = () => {
  return {
    type: "FILTERS_FETCHING",
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const filtersActiveButton = (button) => {
  return {
    type: "FILTERS_ACTIVE_BUTTON",
    payload: button,
  };
};

// export const filtersActiveButton = (button) => (dispatch) => {
//   setTimeout(() => {
//     dispatch({
//       type: "FILTERS_ACTIVE_BUTTON",
//       payload: button,
//     });
//   }, 1000);
// };
