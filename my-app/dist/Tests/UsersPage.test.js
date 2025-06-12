"use strict";

var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _UsersPage = _interopRequireDefault(require("../Pages/UsersPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Mock du composant ListUsers
jest.mock('../Component/ListUsers', function () {
  return function () {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      "data-testid": "list-users",
      children: "Mocked ListUsers"
    });
  };
});
describe('UsersPage Component', function () {
  test('should render without crashing', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersPage["default"], {}));
    expect(_react2.screen.getByTestId('list-users')).toBeInTheDocument();
  });
  test('should render the container with correct styles', function () {
    (0, _react2.render)(/*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersPage["default"], {}));
    var container = _react2.screen.getByTestId('users-page-container'); // Cible directement le conteneur principal
    expect(container).toHaveStyle({
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    });
  });
});