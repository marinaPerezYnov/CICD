import { users } from '../Utils/Mocks/Users';

describe('Users Mock Data', () => {
  test('should be defined', () => {
    expect(users).toBeDefined();
  });

  test('should be an array', () => {
    expect(Array.isArray(users)).toBe(true);
  });

  test('should contain objects with the correct structure', () => {
    users.forEach((user) => {
      expect(user).toHaveProperty('id');
      expect(typeof user.id).toBe('number');

      expect(user).toHaveProperty('nom');
      expect(typeof user.nom).toBe('string');

      expect(user).toHaveProperty('prenom');
      expect(typeof user.prenom).toBe('string');

      expect(user).toHaveProperty('email');
      expect(typeof user.email).toBe('string');
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Vérifie le format de l'email

      expect(user).toHaveProperty('date_naissance');
      expect(typeof user.date_naissance).toBe('string');
      expect(new Date(user.date_naissance).toString()).not.toBe('Invalid Date'); // Vérifie que la date est valide

      expect(user).toHaveProperty('pays');
      expect(typeof user.pays).toBe('string');

      expect(user).toHaveProperty('ville');
      expect(typeof user.ville).toBe('string');

      expect(user).toHaveProperty('code_postal');
      expect(typeof user.code_postal).toBe('string');
      expect(user.code_postal).toMatch(/^\d{5}$/); // Vérifie que le code postal est un nombre à 5 chiffres

      expect(user).toHaveProperty('nombre_achat');
      expect(typeof user.nombre_achat).toBe('number');
    });
  });

  test('should contain at least one user', () => {
    expect(users.length).toBeGreaterThan(0);
  });
});