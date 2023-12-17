import React from "react";

import {
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

describe("testing navbar component", () => {
  test("should logo exist", () => {
    render(<NavBar user={null} />);
    const title1 = screen.getByText(/Data/i);
    const title2 = screen.getByText(/analytics/i);
    const logo = screen.getByTestId(/logo/i);
    expect(title1).toBeInTheDocument();
    expect(title2).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });

  test("should user data render or not", () => {
    const user = {
      email: "test@gmil.com",
      photoURL: "test.png",
      displayName: "user",
    };
    render(<NavBar user={user} />);

    const userMenu = screen.getByTestId(/usericon/i);

    expect(userMenu).toBeInTheDocument();
  });

  test("should user name showing", () => {
    const user = {
      email: "test@gmil.com",
      photoURL: "test.png",
      displayName: "user",
    };
    render(<NavBar user={user} />);
    const username = screen.getByTestId(/paragraph/i);
    expect(username.textContent).toBe("user");
  });

  test("should user email showing", () => {
    const user = {
      email: "test@gmil.com",
      photoURL: "test.png",
    };
    render(<NavBar user={user} />);
    const username = screen.getByTestId(/paragraph/i);
    expect(username.textContent).toBe("test@gmil.com");
  });
  test("should image is showing or not", () => {
    const user = {
      email: "test@gmil.com",
      photoURL: "test.png",
    };
    render(<NavBar user={user} />);
    const userImage = screen.getAllByRole("img");
    expect(userImage.length).toBe(1);
  });

  test("should sign out button exist", () => {
    const user = {
      email: "test@gmil.com",
      photoURL: "test.png",
    };
    render(<NavBar user={user} />);
    const logoutbtn = screen.getByRole("button");
    expect(logoutbtn).toBeInTheDocument();
  });
});
