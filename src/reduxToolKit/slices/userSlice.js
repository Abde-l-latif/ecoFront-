import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  error: false,
  loading: false,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signinLoading: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userInfo = action.payload;
    },
    signoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    signoutError: (state, action) => {
      state.error = action.payload;
    },
    deleteAccountSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    deleteAccountError: (state, action) => {
      state.error = action.payload;
    },
    deleteAccountLoading: (state) => {
      state.loading = true;
    },
    updateAccountSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
    },
    updateAccountError: (state, action) => {
      state.error = action.payload;
    },
    updateAccountLoading: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAccountSuccess,
  updateAccountError,
  updateAccountLoading,
  signinError,
  signinLoading,
  signinSuccess,
  signoutSuccess,
  signoutError,
  deleteAccountSuccess,
  deleteAccountError,
  deleteAccountLoading,
} = UserSlice.actions;

export default UserSlice.reducer;
