import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    darkMode: true,
    apps: null,
  },
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setApps: (state, action) => {
      state.apps = action.payload;
    },
  },
});

export default globalSlice.reducer;
export const { setDarkMode, setApps } = globalSlice.actions;
