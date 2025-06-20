import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import ListUsers from "../Component/ListUsers";
import { users } from "../Utils/Mocks/Users";
import axios from "axios";

// Mock axios pour simuler l'appel API
jest.mock("axios");

describe("ListUsers Component", () => {
  beforeEach(() => {
    // Simuler la réponse d'API
    axios.get.mockResolvedValue({
      data: { utilisateurs: users }
    });

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });
  
  test("should render without crashing", async () => {
    // Utiliser act pour envelopper le rendu et les mises à jour asynchrones
    await act(async () => {
      render(<ListUsers />);
    });
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
  });

  test("should display the correct number of users", async () => {
    // Utiliser act pour envelopper le rendu et les mises à jour asynchrones
    await act(async () => {
      render(<ListUsers />);
    });
    
    expect(screen.getByText(/user\(s\) already registered/i)).toBeInTheDocument();
    
    const userItems = screen.getAllByText(/Utilisateur \d+/i);
    expect(userItems.length).toBe(users.length);
  });

  test("should display user details correctly", async () => {
    // Utiliser act pour envelopper le rendu et les mises à jour asynchrones
    await act(async () => {
      render(<ListUsers />);
    });

    for (const user of users) {
      expect(screen.getByText(`Nom : ${user.nom}`)).toBeInTheDocument();
      expect(screen.getByText(`Prenom: ${user.prenom}`)).toBeInTheDocument();
      expect(screen.getByText(`Date de naissance: ${user.date_naissance}`)).toBeInTheDocument();
    }
  });

  test("should render the container with correct styles", () => {
    render(<ListUsers />);
    const container = screen.getByText(/Liste des utilisateurs/i).parentElement;
    expect(container).toHaveStyle({
      marginTop: "30px",
      border: "1px solid #ccc",
      padding: "20px",
      backgroundColor: "aquamarine",
    });
  });
});