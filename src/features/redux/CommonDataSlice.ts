import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDilog: false,
};

const commonDataSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    showAlertDilog: (state, action) => {
      state.showDilog = action.payload;
    },
  },
});

export const { showAlertDilog } = commonDataSlice.actions;
export default commonDataSlice.reducer;
