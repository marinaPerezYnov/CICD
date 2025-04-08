"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _Users = require("../Utils/Mocks/Users");
var _material = require("@mui/material");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
/**
 * 
 * Liste des utilisateurs
 */var ListUsers = function ListUsers() {
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
    sx: {
      marginTop: '30px',
      border: '1px solid #ccc',
      padding: '20px',
      backgroundColor: 'aquamarine'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
      variant: "h4",
      component: "h3",
      gutterBottom: true,
      sx: {
        marginBottom: '20px',
        padding: '2% 5%'
      },
      children: "Liste des utilisateurs"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Container, {
      sx: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      },
      children: _Users.users.map(function (user, index) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.List, {
          children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.ListItem, {
            sx: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              border: '1px solid #ccc',
              padding: '20px',
              backgroundColor: 'white'
            },
            children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Typography, {
              variant: "h6",
              component: "h1",
              gutterBottom: true,
              children: ["Utilisateur ", index + 1]
            }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Box, {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Nom : ", user.nom]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Prenom: ", user.prenom]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Email: ", user.email]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Date de naissance: ", user.date_naissance]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Pays: ", user.pays]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Ville: ", user.ville]
              }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
                children: ["Code postal: ", user.code_postal]
              })]
            })]
          })
        }, index);
      })
    })]
  });
};
var _default = exports["default"] = ListUsers;