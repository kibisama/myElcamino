import { configureStore } from "@reduxjs/toolkit";
// import orderSlice from "./orderSlice";
import mainSlice from "./mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    // order: orderSlice,
  },
});
