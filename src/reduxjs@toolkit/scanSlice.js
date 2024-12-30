import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { scanInv } from "../lib/api/client";

const asyncInvScan = createAsyncThunk(
  "scanSlice/asyncInvScan",
  async (body, { rejectWithValue }) => {
    try {
      const res = await scanInv(body);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const scanSlice = createSlice({
  name: "scan",
  initialState: {
    open: false,
    mode: "RECEIVE",
    source: "CARDINAL",
    cost: undefined,
    isUpdating: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    setOpen: (state, action) => {
      if (action.payload == null) {
        state.open = !state.open;
        return;
      }
      state.open = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setCost: (state, action) => {
      state.cost = action.payload;
    },
    setIsUpdated: (state, action) => {
      state.isUpdated = action.payload;
    },
    setError: (state, action) => {
      state.isUpdated = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(asyncInvScan.pending, (state, action) => {
      state.isUpdated = false;
      state.isUpdating = true;
    });
    builder.addCase(asyncInvScan.fulfilled, (state, action) => {
      if (action.payload.error != null) {
        state.error = action.payload.error;
      } else {
        state.error = null;
        state.isUpdated = true;
      }
      state.isUpdating = false;
    });
    builder.addCase(asyncInvScan.rejected, (state, action) => {
      state.error = 500;
      state.isUpdating = false;
    });
  },
});

export default scanSlice.reducer;
export const { setOpen, setMode, setSource, setCost, setIsUpdated, setError } =
  scanSlice.actions;
export { asyncInvScan };
