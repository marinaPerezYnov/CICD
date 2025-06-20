import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ConnectionPage from '../Pages/ConnectionPage';

// Mock axios
jest.mock('axios');

describe('ConnectionPage Component', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test('affiche le formulaire de connexion correctement', () => {
    render(<ConnectionPage />);
    
    expect(screen.getByText('Connexion Administrateur')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  test('affiche un message d\'erreur lors d\'une connexion échouée', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          detail: 'Identifiants invalides'
        }
      }
    });

    render(<ConnectionPage />);
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Identifiants invalides')).toBeInTheDocument();
    });
    expect(sessionStorage.getItem('admin_token')).toBeNull();
  });

  test('enregistre le token dans le sessionStorage lors d\'une connexion réussie', async () => {
    const mockToken = 'fake-jwt-token';
    axios.post.mockResolvedValueOnce({
      data: {
        token: mockToken
      }
    });

    render(<ConnectionPage />);
    
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'admin@example.com' } });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));
    
    await waitFor(() => {
      expect(screen.getByText('Connexion réussie !')).toBeInTheDocument();
    });
    expect(sessionStorage.getItem('admin_token')).toBe(mockToken);
  });

  test('permet de basculer la visibilité du mot de passe', () => {
    render(<ConnectionPage />);
    
    const passwordInput = screen.getByLabelText(/Mot de passe/i);
    expect(passwordInput.type).toBe('password');
    
    fireEvent.click(screen.getByRole('button', { name: /toggle password visibility/i }));
    expect(passwordInput.type).toBe('text');
    
    fireEvent.click(screen.getByRole('button', { name: /toggle password visibility/i }));
    expect(passwordInput.type).toBe('password');
  });
});