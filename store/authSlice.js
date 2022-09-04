import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";


// Initial state
const initialState = {
  authState: null,
  user: null,
}

// Actual Slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
  
      // Action to set the authentication status
      setAuthState(state, action) {
        state.authState = action.payload;
      },

      setUser(state, action) {
        state.user = action.payload
      },
  
      // Special reducer for hydrating the state. Special case for next-redux-wrapper
      extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload.auth,
          };
        },
      },
  
    },
  });
  
  export const { setAuthState, setUser, setUserId } = authSlice.actions;
  
export const selectAuthState = (state) => state.auth.authState
export const selectUser = (state) => state.auth.user
  
export default authSlice.reducer;