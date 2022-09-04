import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
})

const makeStore = () => store

export const wrapper = createWrapper(makeStore);