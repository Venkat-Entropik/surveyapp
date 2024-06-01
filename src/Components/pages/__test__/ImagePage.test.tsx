import React from "react";
import { screen, render, fireEvent, act } from "@testing-library/react";

import "@testing-library/jest-dom";
import FileUpload from "../ImagePage";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../features/store";
import { ChakraProvider, useToast as baseUseToast } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

const ImageCompWrapper = () => {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <FileUpload />
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
    render(<ImageCompWrapper />);
    const uploadLogo = screen.getByTestId(/uploadlogo/i);
    const uploadText = screen.getByText(/upload files/i);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    const filetype = screen.getByText(/Supported file types: JPG, JPEG, PNG./);
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
    render(<ImageCompWrapper />);
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
    render(<ImageCompWrapper />);
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
    render(<ImageCompWrapper />);
    const titleInput = screen.getByPlaceholderText(/enter title/i);

    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(descriptionInput, { target: { value: "description" } });

    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Upload Image",
      description: "Images Not Uploaded",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should images input showing error message", async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<ImageCompWrapper />);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    act(() => {
      userEvent.upload(inputUpload, [
        new File(["image1.png"], "image1.png", { type: "image/png" }),
        new File(["image2.png"], "image2.png", { type: "image/png" }),
        new File(["image3.png"], "image3.png", { type: "image/png" }),
        new File(["image4.png"], "image4.png", { type: "image/png" }),
        new File(["image5.png"], "image5.png", { type: "image/png" }),
      ]);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: "You can only select up to 4 images.",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
    expect(inputUpload).toHaveValue("");
  });

  test("should images types cheking", async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<ImageCompWrapper />);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    act(() => {
      userEvent.upload(inputUpload, [
        new File(["image2.pdf"], "image2.pdf", { type: "image/pdf" }),
      ]);
    });
    expect(mockToast).toHaveBeenCalledWith({
      title: "Please select only image files (JPEG, PNG, GIF).",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });

  test("should data working", async () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    render(<ImageCompWrapper />);
    const inputUpload = screen.getByPlaceholderText(/Enter files/i);
    const titleInput = screen.getByPlaceholderText(/enter title/i);
    const descriptionInput =
      screen.getByPlaceholderText(/enter description.../i);

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    act(() => {
      userEvent.upload(inputUpload, [
        new File(["image4.png"], "image4.png", { type: "image/png" }),
        new File(["image5.png"], "image5.png", { type: "image/png" }),
      ]);
    });

    fireEvent.change(titleInput, { target: { value: "title" } });
    fireEvent.change(descriptionInput, { target: { value: "description" } });

    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Images Uploaded Successfully",
      description: "Please check in the home page",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  });
});
