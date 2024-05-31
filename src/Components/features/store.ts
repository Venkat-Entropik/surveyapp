import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./redux/surveySlice";
import dataSlice from "./redux/dataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    survey: surveySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

