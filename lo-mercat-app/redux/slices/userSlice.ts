import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface UserState {
  authState: boolean;
}

// Initial state
const initialUserState: UserState = {
  authState: false,
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
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


export const { setAuthState } = userSlice.actions;

export const selectAuthState = (state: AppState) => state.user.authState;

export default userSlice.reducer;