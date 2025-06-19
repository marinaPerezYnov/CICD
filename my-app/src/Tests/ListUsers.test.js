import React from "react";
import { render, screen } from "@testing-library/react";
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
  });

  test("should render without crashing", () => {
    render(<ListUsers />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
  });

  test("should display the correct number of users", async () => {
    render(<ListUsers />);
    
    expect(screen.getByText(/user\(s\) already registered/i)).toBeInTheDocument();
    
    const userItems = await screen.findAllByText(/Utilisateur \d+/i, {}, { timeout: 1000 });
    expect(userItems.length).toBe(users.length);
  });

  test("should display user details correctly", async () => {
    render(<ListUsers />);

    for (const user of users) {
      await screen.findByText(`Nom : ${user.nom}`, {}, { timeout: 1000 });
      expect(screen.getByText(`Prenom: ${user.prenom}`)).toBeInTheDocument();
      expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
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