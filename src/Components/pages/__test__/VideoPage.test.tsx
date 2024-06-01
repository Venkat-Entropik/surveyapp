import React from "react";
import { screen, render, fireEvent, act } from "@testing-library/react";

import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../features/store";
import { ChakraProvider, useToast as baseUseToast } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import VideoUpload from "../VideoPage";

const VideoCompWrapper = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <VideoUpload />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

jest.mock("url", () => ({
  createObjectURL: jest.fn(),
}));

const useToast = baseUseToast as jest.Mock;
global.URL.createObjectURL = jest.fn();
describe("welcome page testing", () => {
  test("should image page exist", () => {
    render(<VideoCompWrapper />);
    const uploadLogo = screen.getByTestId(/uploadlogo/i);
    const uploadText = screen.getByText(/upload files/i);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    const filetype = screen.getByText(/Supported file types: MP4, X-m4v,/i);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(uploadLogo).toBeInTheDocument();
    expect(uploadText).toBeInTheDocument();
    expect(inputUpload).toBeInTheDocument();
    expect(filetype).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  test("should title input working", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<VideoCompWrapper />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    fireEvent.change(titleInput, { e: { target: { value: "" } } });
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Title should not be empty",
      description: "Enter Title",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should description value showing error", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<VideoCompWrapper />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);

    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(descriptionInput, { target: { value: "" } });

    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Description should not be empty",
      description: "Enter Description",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should files not upload error is showing", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<VideoCompWrapper />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);

    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(descriptionInput, { target: { value: "description" } });

    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Upload Video",
      description: "Video Not Uploaded",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should images types cheking", async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<VideoCompWrapper />);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    act(() => {
      userEvent.upload(inputUpload, [
        new File(["image2.pdf"], "image2.pdf", { type: "image/pdf" }),
      ]);
    });
    expect(mockToast).toHaveBeenCalledWith({
      title: "Please select only video files (mp4, x-m4v etc..).",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should data working", async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<VideoCompWrapper />);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    act(() => {
      userEvent.upload(inputUpload, [
        new File(["video.mp4"], "video.mp4", { type: "video/mp4" }),
      ]);
    });

    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(descriptionInput, { target: { value: "description" } });

    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Video Uploaded Successfully",
      description: "Please check in home page",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  });
});
