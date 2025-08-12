import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    apps: "",
    screen: "home",
  },
  reducers: {
    setApps: (state, action) => {
      state.apps = action.payload;
    },
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setScreen, setApps } = mainSlice.actions;
