import { configureStore } from "@reduxjs/toolkit";
import surveySlice from "./redux/surveySlice";
import dataSlice from "./redux/dataSlice";
import CommonDataSlice from "./redux/CommonDataSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    survey: surveySlice,
    common: CommonDataSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
