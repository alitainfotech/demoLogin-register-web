import { createSlice } from "@reduxjs/toolkit";
import { AUTH_SLICE } from "./slice-names";

export const authSlice = createSlice({
  name: AUTH_SLICE,
  initialState: {
    loginLoading: false,
    loggedInUser: null,
    loginMessage: "",
    loginError: "",
    signUpLoading: false,
    signUpError: "",
  },
  reducers: {
    loginRequest: (state) => {
      state.loginLoading = true;
      state.loginMessage = "";
    },
    loginSuccess: (state, action) => {
      state.loginLoading = false;
      state.loggedInUser = action.payload.user;
      state.loginMessage = action.payload.message;
    },
    loginError: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    signUpRequest: (state) => {
      state.signUpLoading = true;
      state.loggedInUser = null;
      state.signUpError = "";
    },
    signUpSuccess: (state, action) => {
      state.signUpLoading = false;
      state.loggedInUser = action.payload;
    },
    signUpError: (state, action) => {
      state.signUpLoading = false;
      state.signUpError = action.payload;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
    },
    setReset: (state) => {
      state.signUpError = "";
      state.loginError = "";
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginError,
  signUpRequest,
  signUpSuccess,
  signUpError,
  setLoggedInUser,
  setReset
} = authSlice.actions;

export default authSlice.reducer;
