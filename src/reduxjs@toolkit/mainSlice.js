import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    app: "",
    page: "Home",
  },
  reducers: {
    setApp: (state, action) => {
      state.app = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setPage, setApp } = mainSlice.actions;
