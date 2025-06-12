import { render, screen, fireEvent } from '@testing-library/react';
import Form from './../Component/Form';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Form Component', () => {
  test('désactivation du bouton si les champs ne sont pas remplis', () => {
    render(<Form />);
    const button = screen.getByRole('button', { name: /sauvegarder/i });
    expect(button).toBeDisabled();
  });

  test('sauvegarde dans le local storage et toaster de succès, avec champs vidés', () => {
    render(<Form />);
    fireEvent.change(screen.getByTestId('nom-input'), { target: { value: 'Jean' } });
    fireEvent.change(screen.getByTestId('prenom-input'), { target: { value: 'Dupont' } });
    fireEvent.change(screen.getByTestId('mail-input'), { target: { value: 'jean.dupont@example.com' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '1990-01-01' } });
    fireEvent.change(screen.getByTestId('ville-input'), { target: { value: 'Paris' } });
    fireEvent.change(screen.getByTestId('code-postal-input'), { target: { value: '75001' } });

    const button = screen.getByRole('button', { name: /Sauvegarder/i });
    fireEvent.click(button);

    expect(localStorage.getItem('name')).toBe('Dupont');
    expect(toast.success).toHaveBeenCalledWith('Données sauvegardées avec succès !');
    expect(screen.getByTestId('nom-input').value).toBe('Jean');
  });
});