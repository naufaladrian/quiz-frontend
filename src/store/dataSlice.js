import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    profile: {},
  },
  reducers: {
    editProfile(state, action) {
      state.profile = action.payload.profile;
    },
  },
});
export const { editProfile } = dataSlice.actions;
export default dataSlice.reducer;
