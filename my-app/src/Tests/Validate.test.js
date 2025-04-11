import { isAdult, isValidPostalCode, isValidName, isValidEmail } from './../Utils/Validate/Validate.js';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('Validation Functions', () => {
  
  // Tests pour isAdult
  describe('isAdult', () => {
    test('should return true for age >= 18 when birthday has passed this year', () => {
      expect(isAdult('2000-01-01')).toBe(true); // Anniversaire déjà passé
    });
  
    test('should return false for age < 18 when birthday is later this year', () => {
      const today = new Date();
      const futureBirthday = `${today.getFullYear() - 18}-${today.getMonth() + 2}-${today.getDate()}`;
      expect(isAdult(futureBirthday)).toBe(false); // Anniversaire pas encore passé
    });
  
    test('should return true for age >= 18 when birthday is today', () => {
      const today = new Date();
      const birthdayToday = `${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate()}`;
      expect(isAdult(birthdayToday)).toBe(true); // Anniversaire aujourd'hui
    });
  
    test('should return false for age < 18 when birthday is later this month', () => {
      const today = new Date();
      const futureBirthday = `${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate() + 1}`;
      expect(isAdult(futureBirthday)).toBe(false); // Anniversaire pas encore passé ce mois-ci
    });
    
    test('should return true for age >= 18', () => {
      expect(isAdult('2000-01-01')).toBe(true);
    });

    test('should return false for age < 18', () => {
      expect(isAdult('2010-01-01')).toBe(false);
    });

    test('should handle edge cases for date boundaries', () => {
      const today = new Date();
      const birthdayToday = `${today.getFullYear() - 18}-${today.getMonth() + 1}-${today.getDate()}`;
      expect(isAdult(birthdayToday)).toBe(true);
    });
  });

  // Tests pour isValidPostalCode
  describe('isValidPostalCode', () => {
    test('should return true for valid postal code', () => {
      expect(isValidPostalCode('75001')).toBe(true);
      expect(toast.success).toHaveBeenCalledWith('Code postal valide et sauvegardé !');
    });

    test('should return false for invalid postal code', () => {
      expect(isValidPostalCode('123')).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
    });

    test('should save valid postal code to local storage', () => {
      isValidPostalCode('75001');
      expect(localStorage.getItem('postalCode')).toBe('75001');
    });
  });

  // Tests pour isValidName
  describe('isValidName', () => {
    test('should return true for valid names', () => {
      expect(isValidName('Jean')).toBe(true);
      expect(isValidName('Jean-Pierre')).toBe(true);
      expect(toast.success).toHaveBeenCalledWith('Nom valide et sauvegardé !');
    });

    test('should return false for invalid names', () => {
      expect(isValidName('Jean123')).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
    });

    test('should save valid name to local storage', () => {
      isValidName('Jean');
      expect(localStorage.getItem('name')).toBe('Jean');
    });
  });

  // Tests pour isValidEmail
  describe('isValidEmail', () => {
    test('should return true for valid email address', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(toast.success).toHaveBeenCalledWith('Email valide et sauvegardé !');
    });

    test('should return false for invalid email address', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(toast.error).toHaveBeenCalledWith('Email invalide. Veuillez entrer une adresse email valide.');
    });

    test('should save valid email to local storage', () => {
      isValidEmail('test@example.com');
      expect(localStorage.getItem('email')).toBe('test@example.com');
    });
  });
});
