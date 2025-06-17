import dayjs from "dayjs";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findDeliveryLog } from "../lib/api/client";

const asyncFindDeliveryLog = createAsyncThunk(
  "deliverySlice/asyncFindDeliveryLog",
  async (body, { rejectWithValue }) => {
    try {
      const res = await findDeliveryLog(body);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const deliverySlice = createSlice({
  name: "delivery",
  initialState: {
    list: [],
    error: null,
  },
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncFindDeliveryLog.pending, (state, action) => {});
    builder.addCase(asyncFindDeliveryLog.fulfilled, (state, action) => {
      console.log(action.payload.results);
      state.list = action.payload.results;
    });
    builder.addCase(asyncFindDeliveryLog.rejected, (state, action) => {});
  },
});

export default deliverySlice.reducer;
export const { setDate, setError } = deliverySlice.actions;
export { asyncFindDeliveryLog };
