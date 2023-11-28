import { createSlice } from "@reduxjs/toolkit";
import { dataType } from "../../pages/ImagePage";

interface intialStateType {
  images: dataType[];
}

const initialState: intialStateType = {
  images: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,

  reducers: {
    addImages: (state, { payload }) => {
      state.images.push({ ...payload, type: "images" });
    },
    addVideos: (state, { payload }) => {
      state.images.push({ ...payload, type: "videos" });
    },
  },
});

export const { addImages, addVideos } = dataSlice.actions;
export const getAllMovies = (state: any) => state.data.images;
export default dataSlice.reducer;
