import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./redux/dataSlice";
import surveySlice from "./redux/surveySlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    survey: surveySlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
