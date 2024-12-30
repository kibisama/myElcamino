import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalSlice";
import scanSlice from "./scanSlice";
import orderSlice from "./orderSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    scan: scanSlice,
    order: orderSlice,
  },
});
