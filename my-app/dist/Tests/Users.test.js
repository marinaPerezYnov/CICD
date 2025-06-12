"use strict";

var _Users = require("../Utils/Mocks/Users");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
describe('Users Mock Data', function () {
  test('should be defined', function () {
    expect(_Users.users).toBeDefined();
  });
  test('should be an array', function () {
    expect(Array.isArray(_Users.users)).toBe(true);
  });
  test('should contain objects with the correct structure', function () {
    _Users.users.forEach(function (user) {
      expect(user).toHaveProperty('id');
      expect(_typeof(user.id)).toBe('number');
      expect(user).toHaveProperty('nom');
      expect(_typeof(user.nom)).toBe('string');
      expect(user).toHaveProperty('prenom');
      expect(_typeof(user.prenom)).toBe('string');
      expect(user).toHaveProperty('email');
      expect(_typeof(user.email)).toBe('string');
      expect(user.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); // Vérifie le format de l'email

      expect(user).toHaveProperty('date_naissance');
      expect(_typeof(user.date_naissance)).toBe('string');
      expect(new Date(user.date_naissance).toString()).not.toBe('Invalid Date'); // Vérifie que la date est valide

      expect(user).toHaveProperty('pays');
      expect(_typeof(user.pays)).toBe('string');
      expect(user).toHaveProperty('ville');
      expect(_typeof(user.ville)).toBe('string');
      expect(user).toHaveProperty('code_postal');
      expect(_typeof(user.code_postal)).toBe('string');
      expect(user.code_postal).toMatch(/^\d{5}$/); // Vérifie que le code postal est un nombre à 5 chiffres

      expect(user).toHaveProperty('nombre_achat');
      expect(_typeof(user.nombre_achat)).toBe('number');
    });
  });
  test('should contain at least one user', function () {
    expect(_Users.users.length).toBeGreaterThan(0);
  });
});