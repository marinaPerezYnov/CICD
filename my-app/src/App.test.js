import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import { MemoryRouter } from "react-router-dom";

describe("Tests du routeur de l'application", () => {
  test("rend la page d'enregistrement des données utilisateur pour la route /CICD", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App disableRouter={true} />
      </MemoryRouter>
    );

    // Debug pour inspecter le DOM si nécessaire
    screen.debug();

    // Vérification avec un `waitFor` pour gérer un rendu asynchrone
    const container = await screen.findByTestId('save-datas-form-page-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto",
    });
  });

  test("rend la page de liste des utilisateurs pour la route /CICD/listUsers", async () => {

    render(
      <MemoryRouter initialEntries={["/listUsers"]}> 
        <App disableRouter={true} />
      </MemoryRouter>
    );

    // Debug pour inspecter le DOM si nécessaire
    screen.debug();

    const container = await screen.getByTestId('users-page-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle({
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto",
    });
  });
});
