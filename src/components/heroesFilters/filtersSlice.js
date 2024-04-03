import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { useHttp } from "../../hooks/http.hook";

const filterAdapter = createEntityAdapter({
  selectId: (item) => item,
});

const initialState = filterAdapter.getInitialState({
  filtersLoadingStatus: "idle",
  activeFilter: "Все",
});

export const fetchFilters = createAsyncThunk(
  "filters/fetchFilters",
  async () => {
    const { request } = useHttp();
    const data = await request("http://localhost:3001/filters");
    return Object.values(data);
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filtersActiveButton: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = "loading";
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filtersLoadingStatus = "idle";
        filterAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = "error";
      });
  },
});

const { actions, reducer } = filterSlice;

export default reducer;

export const { selectAll } = filterAdapter.getSelectors(
  (state) => state.filters
);

export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersActiveButton,
} = actions;
