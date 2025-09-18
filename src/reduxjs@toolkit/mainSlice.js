import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDeliveries } from "../lib/api/client";

const asyncGetDeliveryStations = createAsyncThunk(
  "scanSlice/asyncGetDeliveryStations",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await getDeliveries(body);
      return data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

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
      state.app === action.payload
        ? (state.app = "")
        : (state.app = action.payload);
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
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetDeliveryStations.fulfilled, (state, action) => {
      const { data } = action.payload;
      state.deliveries = data;
    });
  },
});

export default mainSlice.reducer;
export const { setPage, setApp, setActiveApp, setSidebar } = mainSlice.actions;
export { asyncGetDeliveryStations };
