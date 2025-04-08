"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
var _reactToastify = require("react-toastify");
var _Validate = require("../Utils/Validate/Validate");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var Form = function Form() {
  var _useState = (0, _react.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    mail = _useState2[0],
    setMail = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    nom = _useState4[0],
    setNom = _useState4[1];
  var _useState5 = (0, _react.useState)(''),
    _useState6 = _slicedToArray(_useState5, 2),
    prenom = _useState6[0],
    setPrenom = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = _slicedToArray(_useState7, 2),
    dateNaissance = _useState8[0],
    setDateNaissance = _useState8[1];
  var _useState9 = (0, _react.useState)(''),
    _useState10 = _slicedToArray(_useState9, 2),
    ville = _useState10[0],
    setVille = _useState10[1];
  var _useState11 = (0, _react.useState)(''),
    _useState12 = _slicedToArray(_useState11, 2),
    codePostal = _useState12[0],
    setCodePostal = _useState12[1];
  var _useState13 = (0, _react.useState)(false),
    _useState14 = _slicedToArray(_useState13, 2),
    disabled = _useState14[0],
    setDisabled = _useState14[1];
  (0, _react.useEffect)(function () {
    if (mail !== '' && (0, _Validate.isValidEmail)(mail) && nom !== '' && (0, _Validate.isValidName)(nom) && prenom !== '' && (0, _Validate.isValidName)(prenom) && dateNaissance !== '' && (0, _Validate.isAdult)(dateNaissance) && ville !== '' && codePostal !== '' && (0, _Validate.isValidPostalCode)(codePostal)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [mail, nom, prenom, dateNaissance, ville, codePostal]);
  var handleSubmit = function handleSubmit() {
    // Sauvegarde dans le local storage
    localStorage.setItem('name', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('email', mail);
    localStorage.setItem('dateNaissance', dateNaissance);
    localStorage.setItem('ville', ville);
    localStorage.setItem('codePostal', codePostal);

    // Affichage du toaster de succès
    _reactToastify.toast.success('Données sauvegardées avec succès !');

    // Vidage des champs
    setNom('');
    setPrenom('');
    setMail('');
    setDateNaissance('');
    setVille('');
    setCodePostal('');
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.Container, {
    maxWidth: "sm",
    sx: {
      border: '1px solid #ccc',
      padding: '20px'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
      variant: "h4",
      component: "h1",
      gutterBottom: true,
      children: "Sauvegarder les donn\xE9es"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        label: "Nom",
        type: "text",
        value: nom,
        onChange: function onChange(e) {
          setNom(e.target.value);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        label: "Pr\xE9nom",
        type: "text",
        value: prenom,
        onChange: function onChange(e) {
          setPrenom(e.target.value);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        label: "Mail",
        type: "mail",
        value: mail,
        onChange: function onChange(e) {
          setMail(e.target.value);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Typography, {
        variant: "h6",
        gutterBottom: true,
        sx: {
          fontSize: '1rem'
        },
        children: "Date de naissance"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        type: "date",
        value: dateNaissance,
        onChange: function onChange(e) {
          setDateNaissance(e.target.value);
        }
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        label: "Ville",
        type: "text",
        value: ville,
        onChange: function onChange(e) {
          return setVille(e.target.value);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.FormControl, {
      margin: "normal",
      fullWidth: true,
      required: true,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.TextField, {
        label: "Code postal",
        type: "text",
        value: codePostal,
        onChange: function onChange(e) {
          setCodePostal(e.target.value);
        }
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_material.Button, {
      variant: "contained",
      color: "primary",
      sx: {
        backgroundColor: '#c01515'
      },
      type: "submit",
      fullWidth: true,
      disabled: !disabled,
      onClick: handleSubmit,
      children: "Sauvegarder"
    })]
  });
};
var _default = exports["default"] = Form;