import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
    stateChange: null,
  },
  reducers: {
    updateUserProfile: (state, action) => {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
    },
    authStateChange: (state, action) => {
      state.stateChange = action.payload.stateChange;
    },
  },
});

export const { updateUserProfile } = authSlice.actions;
