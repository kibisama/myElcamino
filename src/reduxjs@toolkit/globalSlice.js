import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkMode: true,
    apps: null,
    // screen: "DAILY_ORDER",
    screen: "DAILY_ORDER",
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setApps: (state, action) => {
      state.apps = action.payload;
    },
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setDarkMode, setScreen, setApps } = globalSlice.actions;
