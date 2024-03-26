const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  filtersLoadingStatus: "idle",
  activeFilter: "Все",
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
        heroes:
          state.activeFilter === "Все"
            ? action.payload
            : action.payload.filter(
                (hero) => hero.element === state.activeFilter
              ),
        heroesLoadingStatus: "idle",
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };

    // DELETE
    case "HERO_DELETE":
      const newHeroList = state.heroes.filter(
        (hero) => hero.id !== action.payload
      );
      return {
        ...state,
        heroes:
          state.activeFilter === "Все"
            ? newHeroList
            : newHeroList.filter((hero) => hero.element === state.activeFilter),
      };

    // FILTERS

    case "FILTERS_FETCHING":
      return {
        ...state,
        filtersLoadingStatus: "loading",
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
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
