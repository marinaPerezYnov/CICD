"use strict";

var _Validate = require("./../Utils/Validate/Validate.js");
var _reactToastify = require("react-toastify");
jest.mock('react-toastify', function () {
  return {
    toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  };
});
describe('Validation Functions', function () {
  // Tests pour isAdult
  describe('isAdult', function () {
    test('should return true for age >= 18 when birthday has passed this year', function () {
      expect((0, _Validate.isAdult)('2000-01-01')).toBe(true); // Anniversaire déjà passé
    });
    test('should return false for age < 18 when birthday is later this year', function () {
      var today = new Date();
      var futureBirthday = "".concat(today.getFullYear() - 18, "-").concat(today.getMonth() + 2, "-").concat(today.getDate());
      expect((0, _Validate.isAdult)(futureBirthday)).toBe(false); // Anniversaire pas encore passé
    });
    test('should return true for age >= 18 when birthday is today', function () {
      var today = new Date();
      var birthdayToday = "".concat(today.getFullYear() - 18, "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      expect((0, _Validate.isAdult)(birthdayToday)).toBe(true); // Anniversaire aujourd'hui
    });
    test('should return false for age < 18 when birthday is later this month', function () {
      var today = new Date();
      var futureBirthday = "".concat(today.getFullYear() - 18, "-").concat(today.getMonth() + 1, "-").concat(today.getDate() + 1);
      expect((0, _Validate.isAdult)(futureBirthday)).toBe(false); // Anniversaire pas encore passé ce mois-ci
    });
    test('should return true for age >= 18', function () {
      expect((0, _Validate.isAdult)('2000-01-01')).toBe(true);
    });
    test('should return false for age < 18', function () {
      expect((0, _Validate.isAdult)('2010-01-01')).toBe(false);
    });
    test('should handle edge cases for date boundaries', function () {
      var today = new Date();
      var birthdayToday = "".concat(today.getFullYear() - 18, "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
      expect((0, _Validate.isAdult)(birthdayToday)).toBe(true);
    });
  });

  // Tests pour isValidPostalCode
  describe('isValidPostalCode', function () {
    test('should return true for valid postal code', function () {
      expect((0, _Validate.isValidPostalCode)('75001')).toBe(true);
      expect(_reactToastify.toast.success).toHaveBeenCalledWith('Code postal valide et sauvegardé !');
    });
    test('should return false for invalid postal code', function () {
      expect((0, _Validate.isValidPostalCode)('123')).toBe(false);
      expect(_reactToastify.toast.error).toHaveBeenCalledWith('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
    });
    test('should save valid postal code to local storage', function () {
      (0, _Validate.isValidPostalCode)('75001');
      expect(localStorage.getItem('postalCode')).toBe('75001');
    });
  });

  // Tests pour isValidName
  describe('isValidName', function () {
    test('should return true for valid names', function () {
      expect((0, _Validate.isValidName)('Jean')).toBe(true);
      expect((0, _Validate.isValidName)('Jean-Pierre')).toBe(true);
      expect(_reactToastify.toast.success).toHaveBeenCalledWith('Nom valide et sauvegardé !');
    });
    test('should return false for invalid names', function () {
      expect((0, _Validate.isValidName)('Jean123')).toBe(false);
      expect(_reactToastify.toast.error).toHaveBeenCalledWith('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
    });
    test('should save valid name to local storage', function () {
      (0, _Validate.isValidName)('Jean');
      expect(localStorage.getItem('name')).toBe('Jean');
    });
  });

  // Tests pour isValidEmail
  describe('isValidEmail', function () {
    test('should return true for valid email address', function () {
      expect((0, _Validate.isValidEmail)('test@example.com')).toBe(true);
      expect(_reactToastify.toast.success).toHaveBeenCalledWith('Email valide et sauvegardé !');
    });
    test('should return false for invalid email address', function () {
      expect((0, _Validate.isValidEmail)('invalid-email')).toBe(false);
      expect(_reactToastify.toast.error).toHaveBeenCalledWith('Email invalide. Veuillez entrer une adresse email valide.');
    });
    test('should save valid email to local storage', function () {
      (0, _Validate.isValidEmail)('test@example.com');
      expect(localStorage.getItem('email')).toBe('test@example.com');
    });
  });
});