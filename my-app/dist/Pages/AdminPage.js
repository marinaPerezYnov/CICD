"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var API_URL = 'http://localhost:8000/admin';
function AdminPage() {
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    users = _useState2[0],
    setUsers = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedUsers = _useState4[0],
    setSelectedUsers = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isAdmin = _useState6[0],
    setIsAdmin = _useState6[1];

  // Récupère le token du localStorage
  var token = localStorage.getItem('admin_token');
  (0, _react.useEffect)(function () {
    if (!token) {
      setIsAdmin(false);
      return;
    }

    // Vérifier si l'utilisateur courant est admin
    fetch("".concat(API_URL, "/me"), {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      return setIsAdmin(data.isAdmin);
    })["catch"](function () {
      return setIsAdmin(false);
    });

    // Charger la liste des utilisateurs
    fetch("".concat(API_URL, "/users"), {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      return setUsers(data);
    })["catch"](function () {
      return setUsers([]);
    });
  }, [token]);
  var handleSelect = function handleSelect(userId) {
    setSelectedUsers(function (prev) {
      return prev.includes(userId) ? prev.filter(function (id) {
        return id !== userId;
      }) : [].concat(_toConsumableArray(prev), [userId]);
    });
  };
  var handleDelete = function handleDelete() {
    if (!window.confirm('Confirmer la suppression des utilisateurs sélectionnés ?')) return;
    fetch("".concat(API_URL, "/users"), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer ".concat(token)
      },
      body: JSON.stringify({
        ids: selectedUsers
      })
    }).then(function (res) {
      if (res.ok) {
        setUsers(users.filter(function (u) {
          return !selectedUsers.includes(u.id);
        }));
        setSelectedUsers([]);
      }
    });
  };
  if (!token || !isAdmin) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: "Acc\xE8s refus\xE9. Vous devez \xEAtre administrateur."
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      children: "Liste des utilisateurs"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: handleDelete,
      disabled: selectedUsers.length === 0,
      children: "Supprimer s\xE9lectionn\xE9s"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("table", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("thead", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "S\xE9lectionner"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "ID"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Nom"
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)("th", {
            children: "Email"
          })]
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: users.map(function (user) {
          return /*#__PURE__*/(0, _jsxRuntime.jsxs)("tr", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
                type: "checkbox",
                checked: selectedUsers.includes(user.id),
                onChange: function onChange() {
                  return handleSelect(user.id);
                }
              })
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: user.id
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: user.name
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
              children: user.email
            })]
          }, user.id);
        })
      })]
    })]
  });
}
var _default = exports["default"] = AdminPage;