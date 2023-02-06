import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";
const reducer = {
  data: dataSlice,
};
const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
