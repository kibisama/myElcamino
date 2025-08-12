import { configureStore } from "@reduxjs/toolkit";
// import globalSlice from "./globalSlice";
// import scanSlice from "./scanSlice";
// import orderSlice from "./orderSlice";
// import deliverySlice from "./deliverySlice";
import mainSlice from "./mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    // global: globalSlice,
    // scan: scanSlice,
    // order: orderSlice,
    // delivery: deliverySlice,
  },
});
