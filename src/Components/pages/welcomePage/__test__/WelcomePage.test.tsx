import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomePage from "../WelcomePage";
import { BrowserRouter } from "react-router-dom";

const BrowserRouterPage = () => {
  return (
    <BrowserRouter>
      <WelcomePage />
    </BrowserRouter>
  );
};

describe("welcome page testing", () => {
  test("should welome text exist", () => {
    render(<BrowserRouterPage />);
    const handicon = screen.getByTestId(/handicon/i);
    const welcomeText = screen.getByText(/Welcome to our website/i)
    const loginText = screen.getByText(/please/i)
    expect(handicon).toBeInTheDocument();
    expect(welcomeText).toBeInTheDocument()
    expect(loginText.textContent).toBe("Please Login to continue")
  });
});
