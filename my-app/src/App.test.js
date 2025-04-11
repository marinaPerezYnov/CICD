import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import App from "../App";

describe("Tests du routeur de l'application", () => {
  test("rend la page d'enregistrement des données utilisateur pour la route /CICD", () => {
    render(
      <MemoryRouter initialEntries={["/CICD"]}>
        <App />
      </MemoryRouter>
    );
    const container = screen.getByTestId('save-datas-form-page-container'); 
    expect(container).toHaveStyle({
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  test("rend la page de liste des utilisateurs pour la route /CICD/listUsers", () => {
    render(
      <MemoryRouter initialEntries={["/CICD/listUsers"]}>
        <App />
      </MemoryRouter>
    );

    const container = screen.getByTestId('users-page-container');
    expect(container).toHaveStyle({
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  test("affiche rien pour une route inexistante", () => {
    render(
      <MemoryRouter initialEntries={["/inconnu"]}>
        <App />
      </MemoryRouter>
    );

    const datasContainer = screen.queryByTestId("save-datas-form-page-container");
    const usersContainer = screen.queryByTestId("users-page-container");
    expect(datasContainer).not.toBeInTheDocument();
    expect(usersContainer).not.toBeInTheDocument();
  });
});
