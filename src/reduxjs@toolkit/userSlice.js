import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    storeName: "",
    ln: "",
    fn: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    fax: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      const { payload } = action;
      state.storeName = payload.storeName;
      state.ln = payload.storeManagerLN;
      state.fn = payload.storeManagerFN;
      state.address = payload.storeAddress;
      state.city = payload.storeCity;
      state.state = payload.storeState;
      state.zip = payload.storeZip;
      state.phone = payload.storePhone;
      state.fax = payload.storeFax;
      state.email = payload.storeEmail;
    },
  },
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
