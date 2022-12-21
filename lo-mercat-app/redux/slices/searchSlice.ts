import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface SearchState {
  filters: {
    category: "STAND" | "PRODUCT",
    marketId: number,
    subcategory: string[]
  },
  result: object[] // Preguntar que rebre exactament
  ;
}

// Initial state
const initialState: SearchState = {
  filters: {
    category: "PRODUCT",
    marketId: 1,
    subcategory: []
  },
  result: []
};

// Actual Slice
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {

    // Action to set the filter Parameters
    setFiltersState(state, action) {
      state.filters = action.payload;
    },
    setResultState(state, action) {
        state.result = action.payload
    },
    resetSearchState(state, action) {
        state = initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      })
      .addDefaultCase((state, action) => {})
  }
});

export const { setFiltersState, setResultState, resetSearchState } = searchSlice.actions;

export const selectSearchState = (state: AppState) => state.search;

export default searchSlice.reducer;