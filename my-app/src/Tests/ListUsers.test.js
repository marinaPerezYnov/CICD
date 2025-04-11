import React from "react";
import { render, screen } from "@testing-library/react";
import ListUsers from "../Component/ListUsers";
import { users } from "../Utils/Mocks/Users";

describe("ListUsers Component", () => {
  test("should render without crashing", () => {
    render(<ListUsers />);
    expect(screen.getByText(/Liste des utilisateurs/i)).toBeInTheDocument();
  });

  test("should display the correct number of users", () => {
    render(<ListUsers />);
    const userItems = screen.getAllByRole("listitem");
    expect(userItems.length).toBe(users.length);
  });

  test("should display user details correctly", () => {
    render(<ListUsers />);
    users.forEach((user) => {
        expect(screen.getByText(`Nom : ${user.nom}`)).toBeInTheDocument();
        expect(screen.getByText(`Prenom: ${user.prenom}`)).toBeInTheDocument();
        expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
        expect(screen.getByText(`Date de naissance: ${user.date_naissance}`)).toBeInTheDocument();
    
        // Utilisation de getAllByText pour gérer les doublons
        const paysElements = screen.getAllByText(`Pays: ${user.pays}`);
        expect(paysElements.length).toBeGreaterThan(0); // Vérifie qu'il y a au moins une occurrence
      });
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