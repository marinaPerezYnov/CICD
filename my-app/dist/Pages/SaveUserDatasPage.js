"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var _material = require("@mui/material");
var _Form = _interopRequireDefault(require("../Component/Form"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var SaveUserDatasPage = function SaveUserDatasPage() {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Container, {
    "data-testid": "save-datas-form-page-container",
    sx: {
      height: '100vh',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Form["default"], {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactToastify.ToastContainer, {
        "data-testid": "toast-container"
      })]
    })
  });
};
var _default = exports["default"] = SaveUserDatasPage;