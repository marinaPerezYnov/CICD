"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _material = require("@mui/material");
var _ListUsers = _interopRequireDefault(require("./../Component/ListUsers"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var UsersPage = function UsersPage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Container, {
    "data-testid": "users-page-container",
    sx: {
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Container, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListUsers["default"], {})
    })
  });
};
var _default = exports["default"] = UsersPage;