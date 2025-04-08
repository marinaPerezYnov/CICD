"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAdult = isAdult;
exports.isValidEmail = isValidEmail;
exports.isValidName = isValidName;
exports.isValidPostalCode = isValidPostalCode;
var _reactToastify = require("react-toastify");
// Validation rules utility functions

// Check if the user is 18 years or older
function isAdult(birthDate) {
  var today = new Date();
  var birth = new Date(birthDate);
  var age = today.getFullYear() - birth.getFullYear();
  var monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birth.getDate()) {
    return age - 1 >= 18;
  }
  return age >= 18;
}

// Validate French postal code (5 digits)
function isValidPostalCode(postalCode) {
  var postalCodeRegex = /^[0-9]{5}$/;
  if (postalCodeRegex.test(postalCode)) {
    // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
    localStorage.setItem('postalCode', postalCode);
    _reactToastify.toast.success('Code postal valide et sauvegardé !');
    return true;
  } else {
    // Si invalide, affiche un toaster d'erreur
    _reactToastify.toast.error('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
    return false;
  }
}

// Validate names (no special characters or numbers, but allow accents, hyphens, etc.)
function isValidName(name) {
  var nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/;
  if (nameRegex.test(name)) {
    // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
    localStorage.setItem('name', name);
    _reactToastify.toast.success('Nom valide et sauvegardé !');
    return true;
  } else {
    // Si invalide, affiche un toaster d'erreur
    _reactToastify.toast.error('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
    return false;
  }
}

// Validate email address
function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
    localStorage.setItem('email', email);
    _reactToastify.toast.success('Email valide et sauvegardé !');
    return true;
  } else {
    // Si invalide, affiche un toaster d'erreur
    _reactToastify.toast.error('Email invalide. Veuillez entrer une adresse email valide.');
    return false;
  }
}