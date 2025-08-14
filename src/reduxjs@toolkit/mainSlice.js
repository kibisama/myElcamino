import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    app: "",
    page: "Home",
    isSidebarFullyExpanded: true,
    isSidebarFullyCollapsed: false,
    miniSidebar: false,
    sidebarDrawerTransitions: true,
  },
  reducers: {
    setApp: (state, action) => {
      state.app = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setIsSidebarFullyExpanded: (state, action) => {
      state.isSidebarFullyExpanded = action.payload;
    },
    setIsSidebarFullyCollapsed: (state, action) => {
      state.isSidebarFullyCollapsed = action.payload;
    },
    setMiniSidebar: (state, action) => {
      state.miniSidebar = action.payload;
    },
    setSidebarDrawerTransitions: (state, action) => {
      state.sidebarDrawerTransitions = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const {
  setPage,
  setApp,
  setIsSidebarFullyExpanded,
  setIsSidebarFullyCollapsed,
  setMiniSidebar,
  setSidebarDrawerTransitions,
} = mainSlice.actions;
