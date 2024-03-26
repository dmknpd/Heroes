const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeButton: "Все",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    //HEROES

    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    // FILTERS

    case "FILTERS_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: "idle",
      };
    case "FILTERS_FETCHING_ERROR":
      return {
        ...state,
        filtersLoadingStatus: "error",
      };
    case "FILTERS_ACTIVE_BUTTON":
      return {
        ...state,
        activeButton: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
