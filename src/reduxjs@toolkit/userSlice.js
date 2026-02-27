import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    storeName: "",
    storeManagerLN: "",
    storeManagerFN: "",
    storeAddress: "",
    storeCity: "",
    storeState: "",
    storeZip: "",
    storePhone: "",
    storeFax: "",
    storeEmail: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.storeName = payload.storeName;
      state.storeManagerLN = payload.storeManagerLN;
      state.storeManagerFN = payload.storeManagerFN;
      state.storeAddress = payload.storeAddress;
      state.storeCity = payload.storeCity;
      state.storeState = payload.storeState;
      state.storeZip = payload.storeZip;
      state.storePhone = payload.storePhone;
      state.storeFax = payload.storeFax;
      state.storeEmail = payload.storeEmail;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
