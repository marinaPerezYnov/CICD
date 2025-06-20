import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Form from '../Component/Form';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock de axios et react-toastify
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

// Mock de console.error pour vérifier qu'il est appelé
const originalConsoleError = console.error;
console.error = jest.fn();

describe('Form Component', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restaurer console.error après tous les tests
    console.error = originalConsoleError;
  });

  // Tests existants...

  test('appelle console.error quand la requête axios échoue', async () => {
    // Préparer le mock d'axios pour simuler une erreur
    const errorMessage = 'Network Error';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<Form />);

    // Remplir le formulaire avec des données valides
    fireEvent.change(screen.getByTestId('nom-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('prenom-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('mail-input'), { target: { value: 'jean.dupont@example.com' } });
    
    // Utiliser une date qui rend l'utilisateur majeur (18+ ans)
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20); // 20 ans en arrière
    const formattedDate = pastDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
    
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: formattedDate } });
    fireEvent.change(screen.getByTestId('ville-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('code-postal-input'), { target: { value: '75001' } });

    // Le bouton devrait être activé avec toutes ces données valides
    const submitButton = screen.getByRole('button', { name: /Sauvegarder/i });
    expect(submitButton).toBeEnabled();

    // Déclencher la soumission
    fireEvent.click(submitButton);

    // Attendre que la promesse rejetée soit traitée
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8000/users',
        expect.objectContaining({
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          ville: 'Paris',
          code_postal: '75001',
          pays: 'France',
          nombre_achat: 0
        })
      );
      
      // Vérifier que console.error a été appelé avec l'erreur
      expect(console.error).toHaveBeenCalledWith("error : ", expect.any(Error));
      expect(console.error.mock.calls[0][1].message).toBe(errorMessage);
    });
  });

  test('gère correctement les différents types d\'erreurs réseau', async () => {
    // Tester avec une erreur de timeout
    axios.post.mockRejectedValueOnce({ 
      code: 'ECONNABORTED',
      message: 'timeout of 1000ms exceeded'
    });

    render(<Form />);

    // Remplir le formulaire avec des données valides (comme dans le test précédent)
    fireEvent.change(screen.getByTestId('nom-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('prenom-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('mail-input'), { target: { value: 'jean.dupont@example.com' } });
    
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 20);
    const formattedDate = pastDate.toISOString().split('T')[0];
    
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: formattedDate } });
    fireEvent.change(screen.getByTestId('ville-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('code-postal-input'), { target: { value: '75001' } });

    // Déclencher la soumission
    fireEvent.click(screen.getByRole('button', { name: /Sauvegarder/i }));

    // Attendre que la promesse rejetée soit traitée
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("error : ", expect.anything());
    });

    // Réinitialiser les mocks
    jest.clearAllMocks();

    // Tester avec une erreur de serveur HTTP
    axios.post.mockRejectedValueOnce({
      response: {
        status: 500,
        data: { message: 'Internal Server Error' }
      }
    });

    // Déclencher une nouvelle soumission
    fireEvent.click(screen.getByRole('button', { name: /Sauvegarder/i }));

    // Vérifier que console.error est appelé avec l'erreur HTTP
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("error : ", expect.objectContaining({
        response: expect.objectContaining({
          status: 500
        })
      }));
    });
  });
});