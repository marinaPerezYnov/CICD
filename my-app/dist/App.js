"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./App.css");
var _LoginPage = _interopRequireDefault(require("./Pages/LoginPage"));
var _UsersPage = _interopRequireDefault(require("./Pages/UsersPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function App() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "App",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/CICD",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoginPage["default"], {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/CICD/listUsers",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersPage["default"], {})
        })]
      })
    })
  });
}
var _default = exports["default"] = App;