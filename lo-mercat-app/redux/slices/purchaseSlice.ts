import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface PurchaseState {
  cart: object;
}

// Initial state
const initialState: PurchaseState = {
  cart: {},
};

// Actual Slice
export const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {

    // Action to set the authentication status
    setCartState(state, action) {
      state.cart = action.payload;
    },
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

export const { setCartState } = purchaseSlice.actions;

export const selectCartState = (state: AppState) => state.purchase.cart;

export default purchaseSlice.reducer;