"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("./App.css");
var _SaveUserDatasPage = _interopRequireDefault(require("./Pages/SaveUserDatasPage"));
var _UsersPage = _interopRequireDefault(require("./Pages/UsersPage"));
var _AdminPage = _interopRequireDefault(require("./Pages/AdminPage"));
var _RegisterPage = _interopRequireDefault(require("./Pages/RegisterPage"));
var _ConnectionPage = _interopRequireDefault(require("./Pages/ConnectionPage"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function App(_ref) {
  var disableRouter = _ref.disableRouter;
  var Wrapper = disableRouter ? _react["default"].Fragment : function (_ref2) {
    var children = _ref2.children;
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.BrowserRouter, {
      future: {
        v7_startTransition: true
      },
      children: children
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "App",
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_reactRouterDom.Routes, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SaveUserDatasPage["default"], {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/listUsers",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UsersPage["default"], {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/admin",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AdminPage["default"], {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/admin/s-inscrire",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_RegisterPage["default"], {})
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactRouterDom.Route, {
          exact: true,
          path: "/admin/se-connecter",
          element: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ConnectionPage["default"], {})
        })]
      })
    })
  });
}
var _default = exports["default"] = App;