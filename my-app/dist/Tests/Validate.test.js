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
  test('calcul de l\'âge : âge > 18 ans', function () {
    expect((0, _Validate.isAdult)('2000-01-01')).toBe(true);
    expect((0, _Validate.isAdult)('2010-01-01')).toBe(false);
  });
  test('format du code postal : valide et invalide', function () {
    expect((0, _Validate.isValidPostalCode)('75001')).toBe(true);
    expect((0, _Validate.isValidPostalCode)('123')).toBe(false);
    expect(_reactToastify.toast.error).toHaveBeenCalledWith('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
  });
  test('format des noms et prénoms : valide et invalide', function () {
    expect((0, _Validate.isValidName)('Jean')).toBe(true);
    expect((0, _Validate.isValidName)('Jean-Pierre')).toBe(true);
    expect((0, _Validate.isValidName)('Jean123')).toBe(false);
    expect(_reactToastify.toast.error).toHaveBeenCalledWith('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
  });
  test('format de l\'email : valide et invalide', function () {
    expect((0, _Validate.isValidEmail)('test@example.com')).toBe(true);
    expect((0, _Validate.isValidEmail)('invalid-email')).toBe(false);
    expect(_reactToastify.toast.error).toHaveBeenCalledWith('Email invalide. Veuillez entrer une adresse email valide.');
  });
});