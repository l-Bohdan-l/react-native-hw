import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    nickname: null,
  },
  reducers: {
    updateUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { updateUserId } = authSlice.actions;
