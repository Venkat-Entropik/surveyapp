import React from "react";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import NoDataComp from "./NoDataComp";
import { BrowserRouter } from "react-router-dom";
interface dropdownType {
  dropdown: string;
}

const BroswerRouterComp: React.FC<dropdownType> = ({ dropdown }) => {
  return (
    <BrowserRouter>
      <NoDataComp dropdown={dropdown} />
    </BrowserRouter>
  );
};

describe("testing no data component", () => {
  const dropdownValue = ["images", "videos", "surveys"];
  dropdownValue.forEach((val) => {
    test("should component exist", () => {
      render(<BroswerRouterComp dropdown={val} />);
      const noDataText = screen.getByText(`No ${val} Data Available`);
      const uploadText = screen.getByText(`Upload ${val}`); //Upload {`${dropdown}`}
      expect(noDataText).toBeInTheDocument();
      expect(uploadText).toBeInTheDocument();
    });
  });
  test("should no data image tag available", () => {
    render(<BroswerRouterComp dropdown="images" />);
    const image = screen.getByRole("img", { name: /image/i });
    expect(image).toBeInTheDocument();
  });
  test("should no data image is showing", () => {
    render(<BroswerRouterComp dropdown="images" />);
    const image = screen.getByRole("img", { name: /image/i });
    expect(image.getAttribute("src")).toBe(
      "https://www.chopserve.com/assets/animation_nofound-b0584b837b2c320b19b87eaa0ee18fb427a627ee601bc5472eeb13463fde3c32.gif"
    );
  });
});
