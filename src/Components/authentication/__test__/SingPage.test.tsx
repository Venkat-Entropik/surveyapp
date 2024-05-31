import React from "react";

import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignPage from "../SignPage";
import { BrowserRouter } from "react-router-dom";
import {
  ChakraProvider,
  useDisclosure,
  useToast as baseUseToast,
} from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../../features/store";




const SingInPageWrapper = () => {
  
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Provider store={store}>
          <SignPage />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn(),
  useToast: jest.fn(),
}));
const useToast = baseUseToast as jest.Mock;
describe("testing sign in page", () => {
  test("should all the inputs and buttons available", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    const mockUseDisclosure = useDisclosure as jest.MockedFunction<any>;
    mockUseDisclosure.mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    render(<SingInPageWrapper />);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
  test("should empty value showing error", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    const mockUseDisclosure = useDisclosure as jest.MockedFunction<any>;
    mockUseDisclosure.mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    render(<SingInPageWrapper />);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);
    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.change(emailInput, { target: { value: "email.@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.click(submitBtn);
    expect(mockToast).toHaveBeenCalledWith({
      title: "Email and password does not match",
      description: "Enter valid email and password",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  });
  test("should email input and passowrd input are working", () => {
    const mockToast = jest.fn();
    useToast.mockReturnValue(mockToast);
    const mockUseDisclosure = useDisclosure as jest.MockedFunction<any>;
    mockUseDisclosure.mockReturnValue({
      isOpen: true,
      onOpen: jest.fn(),
      onClose: jest.fn(),
    });

    render(<SingInPageWrapper />);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const passwordInput = screen.getByPlaceholderText(/enter password/i);

    fireEvent.change(emailInput, { target: { value: "email.@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput).toHaveValue("email.@gmail.com");
    expect(passwordInput).toHaveValue("password");
  });
});
