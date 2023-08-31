import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  userId: null,
  nickname: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialStateValues,
  reducers: {
    updateUserProfile: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
    },
    authStateChange: (state, action) => {
      state.stateChange = action.payload.stateChange;
    },
    authUserSignOut: (state, action) => {
      state.userId = initialStateValues.userId;
      state.nickname = initialStateValues.nickname;
      state.stateChange = initialStateValues.stateChange;
    },
  },
});

export const { updateUserProfile, authStateChange, authUserSignOut } =
  authSlice.actions;
