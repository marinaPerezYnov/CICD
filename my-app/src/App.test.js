import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Component", () => {
  test("renders SaveUserDatasPage when path is /CICD", () => {
    render(
      <MemoryRouter initialEntries={["/CICD"]}>
        <App />
      </MemoryRouter>
    );

    // vérifie la présence de ce bloc : data-testid="login-form-page-container"
    const container = screen.getByTestId("login-form-page-container");
    expect(container).toBeInTheDocument();
  });

  test("renders UsersPage when path is /CICD/listUsers", () => {
    render(
      <MemoryRouter initialEntries={["/CICD/listUsers"]}>
        <App />
      </MemoryRouter>
    );

    const container = screen.getByTestId("users-page-container");
    expect(container).toBeInTheDocument();
  });

  // test("renders not found page for invalid path", () => {
    // render(
      // <MemoryRouter initialEntries={["/invalidPath"]}>
        {/* <App /> */}
      {/* </MemoryRouter> */}
    // );

    // expect(screen.queryByText(/Save User Data/i)).not.toBeInTheDocument();
    // expect(screen.queryByText(/Users List/i)).not.toBeInTheDocument();
  // });
});