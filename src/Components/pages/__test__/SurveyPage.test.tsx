import React from "react";

import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, useToast as baseUseToast } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../../features/store";
import SurveyPage from "../SurveyPage";
import "@testing-library/jest-dom";

const SurveyCompWrapper = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <SurveyPage />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  );
};
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

const useToast = baseUseToast as jest.Mock;

describe("survey page component testing", () => {
  test("should survey page content exist", () => {
    render(<SurveyCompWrapper />);
    const header = screen.getByText(/Survey Form Creation/i);
    const surveyTitle = screen.getByPlaceholderText(/Enter Survey Title/i);
    const surveyDescription = screen.getByPlaceholderText(
      /Enter Survey Description/i
    );
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    const addQuestonText = screen.getByText(/Add at least 5 questions/i);
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    expect(header).toBeInTheDocument();
    expect(surveyTitle).toBeInTheDocument();
    expect(surveyDescription).toBeInTheDocument();
    expect(questioInput).toBeInTheDocument();
    expect(addQuestionsBtn).toBeInTheDocument();
    expect(addQuestonText).toBeInTheDocument();
  });
  test("should add question showing error message", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "please Enter Question",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should question is displaying", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    const question1 = screen.getByText(/Question1/i);
    expect(question1).toBeInTheDocument();
  });
  test("should all questions are showing", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question2" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question3" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question4" } });
    fireEvent.click(addQuestionsBtn);
    const question1 = screen.getAllByTestId(/questions/i);
    expect(question1.length).toBe(4);
  });
  test("should submit button is showing after entering 5 questions", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question2" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question3" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question4" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question5" } });
    fireEvent.click(addQuestionsBtn);
    const submitQuestions = screen.getByRole("button", {
      name: /submit questions/i,
    });
    expect(submitQuestions).toBeInTheDocument();
  });
  test("should title error msg showing or not", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question2" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question3" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question4" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question5" } });
    fireEvent.click(addQuestionsBtn);
    const submitQuestions = screen.getByRole("button", {
      name: /submit questions/i,
    });
    fireEvent.click(submitQuestions);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Please enter title",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should description error msg showing or not", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question2" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question3" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question4" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question5" } });
    fireEvent.click(addQuestionsBtn);
    const surveyTitle = screen.getByPlaceholderText(/Enter Survey Title/i);
    fireEvent.change(surveyTitle, { target: { value: "title" } });
    const submitQuestions = screen.getByRole("button", {
      name: /submit questions/i,
    });
    fireEvent.click(submitQuestions);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Enter Description",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should all the questions are submitting or not", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question2" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question3" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question4" } });
    fireEvent.click(addQuestionsBtn);
    fireEvent.change(questioInput, { target: { value: "Question5" } });
    fireEvent.click(addQuestionsBtn);
    const surveyTitle = screen.getByPlaceholderText(/Enter Survey Title/i);
    fireEvent.change(surveyTitle, { target: { value: "title" } });
    const surveyDescription = screen.getByPlaceholderText(
      /Enter Survey Description/i
    );
    fireEvent.change(surveyDescription, { target: { value: "description" } });
    const submitQuestions = screen.getByRole("button", {
      name: /submit questions/i,
    });
    fireEvent.click(submitQuestions);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Survey submitted successfully",
      description: "Please check in home page.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    expect(surveyTitle).toHaveValue("");
    expect(surveyDescription).toHaveValue("");
  });

  test("should radio button working", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const getDrictiveRadio = screen.getByLabelText(/Descriptive/i);
    const getMCQRadio = screen.getByLabelText(/MCQ/i);
    fireEvent.click(getMCQRadio);
    expect(getDrictiveRadio).not.toBeChecked();
    expect(getMCQRadio).toBeChecked();
  });

  test("should option input working", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const getMCQRadio = screen.getByLabelText(/MCQ/i);
    fireEvent.click(getMCQRadio);
    const optionInput = screen.getByPlaceholderText(/Enter Option/i);
    expect(optionInput).toBeInTheDocument();
    expect(getMCQRadio).toBeChecked();
  });

  test("should option empty value showing error", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const getMCQRadio = screen.getByLabelText(/MCQ/i);
    fireEvent.click(getMCQRadio);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const optionInput = screen.getByPlaceholderText(/Enter Option/i);
    fireEvent.change(optionInput, { target: { value: "" } });
    const addOoptionBtn = screen.getByRole("button", { name: /add option/i });
    fireEvent.click(addOoptionBtn);
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Please enter an option",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });
  test("should all options are showing", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<SurveyCompWrapper />);
    const getMCQRadio = screen.getByLabelText(/MCQ/i);
    fireEvent.click(getMCQRadio);
    const questioInput = screen.getByPlaceholderText(/Enter Question/i);
    fireEvent.change(questioInput, { target: { value: "Question1" } });
    const optionInput = screen.getByPlaceholderText(/Enter Option/i);
    fireEvent.change(optionInput, { target: { value: "option1" } });
    const addOoptionBtn = screen.getByRole("button", { name: /add option/i });
    fireEvent.click(addOoptionBtn);
    fireEvent.change(optionInput, { target: { value: "option2" } });
    fireEvent.click(addOoptionBtn);
    const addQuestionsBtn = screen.getByRole("button", {
      name: /Add Question/i,
    });
    fireEvent.click(addQuestionsBtn);
    const optionCount = screen.getAllByTestId(/option/i)
    expect(optionCount.length).toBe(2);
  });
});
