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
    
    // Utilisez queryByText pour chercher un texte qui devrait être présent pour chaque utilisateur
    // Par exemple le message "1 user(s) already registered"
    expect(screen.getByText(/user\(s\) already registered/i)).toBeInTheDocument();
    
    // Si vous voulez vraiment compter les éléments de liste, vous pouvez le faire ainsi:
    // Attendez que les données soient chargées (approche asynchrone)
    const userItems = await screen.findAllByText(/Utilisateur \d+/i, {}, { timeout: 1000 });
    expect(userItems.length).toBe(users.length);
  });

  test("should display user details correctly", async () => {
    render(<ListUsers />);
    
    // Attendez que les données soient chargées
    for (const user of users) {
      // Utilisez findByText pour attendre que le texte apparaisse
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