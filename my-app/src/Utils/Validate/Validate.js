// Validation rules utility functions
import { toast } from 'react-toastify';

// Check if the user is 18 years or older
export function isAdult(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        return age - 1 >= 18;
    }
    return age >= 18;
}

// Validate French postal code (5 digits)
export function isValidPostalCode(postalCode) {
    const postalCodeRegex = /^[0-9]{5}$/;
    if (postalCodeRegex.test(postalCode)) {
        // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
        localStorage.setItem('postalCode', postalCode);
        toast.success('Code postal valide et sauvegardé !');
        return true;
    } else {
        // Si invalide, affiche un toaster d'erreur
        toast.error('Code postal invalide. Veuillez entrer un code postal à 5 chiffres.');
        return false;
    }
}

// Validate names (no special characters or numbers, but allow accents, hyphens, etc.)
export function isValidName(name) {
    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ' -]+$/;
    if (nameRegex.test(name)) {
        // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
        localStorage.setItem('name', name);
        toast.success('Nom valide et sauvegardé !');
        return true;
    } else {
        // Si invalide, affiche un toaster d'erreur
        toast.error('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
        return false;
    }
}

// Validate email address
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
        // Si valide, sauvegarde dans le local storage et affiche un toaster de succès
        localStorage.setItem('email', email);
        toast.success('Email valide et sauvegardé !');
        return true;
    } else {
        // Si invalide, affiche un toaster d'erreur
        toast.error('Email invalide. Veuillez entrer une adresse email valide.');
        return false;
    }
}