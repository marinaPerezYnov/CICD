"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _SaveUserDatasPage = _interopRequireDefault(require("../Pages/SaveUserDatasPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Mock du composant Form
jest.mock('../Component/Form', function () {
  return function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "data-testid": "form",
      children: "Mocked Form"
    });
  };
});
describe('SaveUserDatasPage Component', function () {
  test('should render without crashing', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_SaveUserDatasPage["default"], {}));
    expect(_react2.screen.getByTestId('form')).toBeInTheDocument();
    expect(_react2.screen.getByText(/Mocked Form/i)).toBeInTheDocument();
  });
  test('should render the ToastContainer', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_SaveUserDatasPage["default"], {}));
    var toastContainer = _react2.screen.getByRole('region', {
      name: /notifications/i
    }); // Vérifie l'élément ARIA
    expect(toastContainer).toBeInTheDocument();
  });
  test('should render the container with correct styles', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_SaveUserDatasPage["default"], {}));
    var container = _react2.screen.getByTestId('save-datas-form-page-container'); // Trouve le conteneur parent
    expect(container).toHaveStyle({
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    });
  });
});