import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDailyOrder } from "../lib/api/client";

const asyncGetDailyOrder = createAsyncThunk(
  "orderSlice/asyncGetDailyOrder",
  async (body, { rejectWithValue }) => {
    try {
      const res = await getDailyOrder(body);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncGetDailyOrder.pending, (state, action) => {});
    builder.addCase(asyncGetDailyOrder.fulfilled, (state, action) => {
      state.list = action.payload.results;
    });
    builder.addCase(asyncGetDailyOrder.rejected, (state, action) => {});
  },
});

export default orderSlice.reducer;
export { asyncGetDailyOrder };
