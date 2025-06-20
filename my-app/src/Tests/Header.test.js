import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../Component/Header';

// Mock de BrowserRouter pour éviter l'avertissement
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    BrowserRouter: ({ children }) => <div data-testid="browser-router">{children}</div>
  };
});

describe('Header Component', () => {
  test('affiche tous les liens de navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    // Vérifie que tous les liens sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Liste Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();

    // const connexionLink = screen.getByRole('link', { name: /connexion/i });
    // expect(connexionLink).toBeInTheDocument();
    expect(screen.getByText('Connexion Admin')).toBeInTheDocument();
  });

  test('les liens ont les bons attributs href', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    // Vérifie que les liens pointent vers les bonnes routes
    expect(screen.getByText('Accueil').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Liste Utilisateurs').closest('a')).toHaveAttribute('href', '/listUsers');
    expect(screen.getByText('Admin').closest('a')).toHaveAttribute('href', '/admin');
    expect(screen.getByText('Connexion Admin').closest('a')).toHaveAttribute('href', '/admin/se-connecter');
  });
});