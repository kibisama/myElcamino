import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    app: "",
    activeApp: "",
    page: "Home",
    section: "",
    /** @type {"expanded"|"mobile-expanded"|"mini"|"collapsed"} */
    sidebar: "expanded",
    deliveries: [],
  },
  reducers: {
    setApp: (state, action) => {
      const { payload } = action;
      if (state.app === payload) {
        state.app = "";
        state.activeApp = "";
      } else {
        state.app = payload;
        state.activeApp = payload;
      }
    },
    setActiveApp: (state, action) => {
      state.activeApp = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload.page;
      state.section = action.payload.section;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
    setDeliveries: (state, action) => {
      state.deliveries = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setPage, setApp, setActiveApp, setSidebar, setDeliveries } =
  mainSlice.actions;
