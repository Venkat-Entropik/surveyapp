import { createSlice } from "@reduxjs/toolkit";

interface questions {
  text: string;
  type: "descriptive" | "mcq";
  options?: string[];
}

interface surveydata {
  id: string;
  title: string;
  description: string;
  questions: questions[];
}

interface intialstate {
  surveys: surveydata[];
}
const initialState: intialstate = {
  surveys: [],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,

  reducers: {
    addSurveys: (state, { payload }) => {
      state.surveys.push({ ...payload, type: "survey" });
    },
  },
});

export const { addSurveys } = surveySlice.actions;
export default surveySlice.reducer;
