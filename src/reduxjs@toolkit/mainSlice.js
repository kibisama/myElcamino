import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDeliveryGroups } from "../lib/api/client";

const asyncGetDeliveryGroups = createAsyncThunk(
  "scanSlice/asyncGetDeliveryGroups",
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await getDeliveryGroups(body);
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
    page: "Home",
    section: "",
    /** @type {"expanded"|"mobile-expanded"|"mini"|"collapsed"} */
    sidebar: "expanded",
    deliveryGroups: [],
  },
  reducers: {
    setApp: (state, action) => {
      state.app = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSidebar: (state, action) => {
      state.sidebar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncGetDeliveryGroups.fulfilled, (state, action) => {
      console.log(action.payload);
      const { results } = action.payload;
      state.deliveryGroups = results;
    });
    builder.addCase(asyncGetDeliveryGroups.rejected, (state, action) => {});
  },
});

export default mainSlice.reducer;
export const { setPage, setApp, setSidebar, setSection } = mainSlice.actions;
export { asyncGetDeliveryGroups };
