import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    user: userSlice,
  },
});
