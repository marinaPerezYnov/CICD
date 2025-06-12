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
    _react.fireEvent.change(_react.screen.getByTestId('nom-input'), {
      target: {
        value: 'Jean'
      }
    });
    _react.fireEvent.change(_react.screen.getByTestId('prenom-input'), {
      target: {
        value: 'Dupont'
      }
    });
    _react.fireEvent.change(_react.screen.getByTestId('mail-input'), {
      target: {
        value: 'jean.dupont@example.com'
      }
    });
    _react.fireEvent.change(_react.screen.getByTestId('date-input'), {
      target: {
        value: '1990-01-01'
      }
    });
    _react.fireEvent.change(_react.screen.getByTestId('ville-input'), {
      target: {
        value: 'Paris'
      }
    });
    _react.fireEvent.change(_react.screen.getByTestId('code-postal-input'), {
      target: {
        value: '75001'
      }
    });
    var button = _react.screen.getByRole('button', {
      name: /Sauvegarder/i
    });
    _react.fireEvent.click(button);
    expect(localStorage.getItem('name')).toBe('Dupont');
    expect(_reactToastify.toast.success).toHaveBeenCalledWith('Données sauvegardées avec succès !');
    expect(_react.screen.getByTestId('nom-input').value).toBe('Jean');
  });
});