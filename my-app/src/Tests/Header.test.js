import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../Component/Header';

describe('Header Component', () => {
  test('affiche tous les liens de navigation', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Vérifie que tous les liens sont présents
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Liste Utilisateurs')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Connexion')).toBeInTheDocument();
  });

  test('les liens ont les bons attributs href', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    
    // Vérifie que les liens pointent vers les bonnes routes
    expect(screen.getByText('Accueil').closest('a')).toHaveAttribute('href', '/');
    expect(screen.getByText('Liste Utilisateurs').closest('a')).toHaveAttribute('href', '/listUsers');
    expect(screen.getByText('Admin').closest('a')).toHaveAttribute('href', '/admin');
    expect(screen.getByText('Connexion').closest('a')).toHaveAttribute('href', '/admin/se-connecter');
  });
});