import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    app: "",
    page: "Home",
    /** @type {"expanded"|"mobile-expanded"|"mini"|"collapsed"} */
    sidebar: "expanded",
  },
  reducers: {
    setApp: (state, action) => {
      state.app = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setPage, setApp, setSidebar } = mainSlice.actions;
