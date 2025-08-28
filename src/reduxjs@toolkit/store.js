import { configureStore } from "@reduxjs/toolkit";
// import scanSlice from "./scanSlice";
// import orderSlice from "./orderSlice";
import mainSlice from "./mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    // scan: scanSlice,
    // order: orderSlice,
  },
});
