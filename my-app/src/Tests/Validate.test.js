import { isAdult, isValidPostalCode, isValidName, isValidEmail } from './../Utils/Validate/Validate.js';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Validation Functions', () => {
  test('calcul de l\'âge : âge > 18 ans', () => {
    expect(isAdult('2000-01-01')).toBe(true);
    expect(isAdult('2010-01-01')).toBe(false);
  });

  test('format du code postal : valide et invalide', () => {
    expect(isValidPostalCode('75001')).toBe(true);
    expect(isValidPostalCode('123')).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
  });

  test('format des noms et prénoms : valide et invalide', () => {
    expect(isValidName('Jean')).toBe(true);
    expect(isValidName('Jean-Pierre')).toBe(true);
    expect(isValidName('Jean123')).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
  });

  test('format de l\'email : valide et invalide', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(toast.error).toHaveBeenCalledWith('Email invalide. Veuillez entrer une adresse email valide.');
  });
});