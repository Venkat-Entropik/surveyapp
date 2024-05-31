import React from "react";

import { screen, render } from "@testing-library/react";
import '@testing-library/jest-dom'
import SimpleSidebar from "../SideBar";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../features/store";

const SideBarWrapper = () => {
    return(
        <BrowserRouter>
        <ChakraProvider>
            <Provider store={store}>
                <SimpleSidebar/>
            </Provider>
        </ChakraProvider>
        </BrowserRouter>
    )
};

describe('testing sidebar',()=>{
    test('should sidebar content visible', () => {
      render(<SideBarWrapper/>)
      const home=screen.getByText(/Home/i)
      const videos=screen.getByText(/Videos/i)
      const images=screen.getByText(/Images/i)
      const Survey=screen.getByText(/Survey/i)
      const database=screen.getByText(/Database/i)
      const analytics=screen.getByText(/Analytics/i)
        const icons = screen.getAllByTestId(/icon/i)
      expect(home).toBeInTheDocument()
      expect(videos).toBeInTheDocument()
      expect(images).toBeInTheDocument()
      expect(Survey).toBeInTheDocument()
      expect(database).toBeInTheDocument()
      expect(analytics).toBeInTheDocument()
      expect(icons.length).toBe(6)

    })
    
})