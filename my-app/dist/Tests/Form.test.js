"use strict";

var _react = require("@testing-library/react");
var _Form = _interopRequireDefault(require("./../Component/Form"));
var _reactToastify = require("react-toastify");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
jest.mock('react-toastify', function () {
  return {
    toast: {
      success: jest.fn(),
      error: jest.fn()
    }
  };
});
describe('Form Component', function () {
  test('désactivation du bouton si les champs ne sont pas remplis', function () {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    var button = _react.screen.getByRole('button', {
      name: /sauvegarder/i
    });
    expect(button).toBeDisabled();
  });
  test('sauvegarde dans le local storage et toaster de succès, avec champs vidés', function () {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    _react.fireEvent.change(_react.screen.getByLabelText(/Nom/i), {
      target: {
        value: 'Jean'
      }
    });
    _react.fireEvent.change(_react.screen.getByLabelText(/Prénom/i), {
      target: {
        value: 'Dupont'
      }
    });
    _react.fireEvent.change(_react.screen.getByLabelText(/Mail/i), {
      target: {
        value: 'jean.dupont@example.com'
      }
    });
    _react.fireEvent.change(_react.screen.getByLabelText(/Date de naissance/i), {
      target: {
        value: '1990-01-01'
      }
    });
    _react.fireEvent.change(_react.screen.getByLabelText(/Ville/i), {
      target: {
        value: 'Paris'
      }
    });
    _react.fireEvent.change(_react.screen.getByLabelText(/Code postal/i), {
      target: {
        value: '75001'
      }
    });
    var button = _react.screen.getByRole('button', {
      name: /Sauvegarder/i
    });
    _react.fireEvent.click(button);
    expect(localStorage.getItem('name')).toBe('Jean');
    expect(_reactToastify.toast.success).toHaveBeenCalledWith('Données sauvegardées avec succès !');
    expect(_react.screen.getByLabelText(/Nom/i).value).toBe('');
  });
  test('toaster d’erreur et erreurs correspondantes en rouge', function () {
    (0, _react.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}));
    _react.fireEvent.change(_react.screen.getByLabelText(/Nom/i), {
      target: {
        value: '123'
      }
    });
    _react.fireEvent.blur(_react.screen.getByLabelText(/Nom/i));
    expect(_reactToastify.toast.error).toHaveBeenCalledWith('Nom invalide. Veuillez entrer un nom sans caractères spéciaux.');
    expect(_react.screen.getByText(/nom invalide/i)).toHaveStyle('color: red');
  });
});