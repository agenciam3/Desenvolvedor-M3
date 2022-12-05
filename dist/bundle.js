/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/components/Card/index.jsx":
/*!******************************************!*\
  !*** ./src/js/components/Card/index.jsx ***!
  \******************************************/
/***/ ((module) => {

eval("var Card = function Card(_ref) {\n  var image = _ref.image,\n      name = _ref.name,\n      price = _ref.price,\n      installment = _ref.installment,\n      installmentValue = _ref.installmentValue,\n      onBuy = _ref.onBuy;\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card-media\"\n  }, /*#__PURE__*/React.createElement(\"img\", {\n    id: \"card-image\",\n    src: image\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card-content\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card-product\"\n  }, /*#__PURE__*/React.createElement(\"span\", {\n    className: \"card-product-title\"\n  }, name)), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card-prices\"\n  }, /*#__PURE__*/React.createElement(\"span\", {\n    id: \"card-price-amount\"\n  }, \"R$ \", price), /*#__PURE__*/React.createElement(\"br\", null), /*#__PURE__*/React.createElement(\"span\", {\n    id: \"card-price-installment\"\n  }, \"at\\xE9 \", installment, \"x de R$ \", installmentValue)), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"card-button\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    id: \"card-button-buy\",\n    onClick: onBuy\n  }, \"Comprar\"))));\n};\n\nmodule.exports = Card;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Card/index.jsx?");

/***/ }),

/***/ "./src/js/components/Cards/index.jsx":
/*!*******************************************!*\
  !*** ./src/js/components/Cards/index.jsx ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar Card = __webpack_require__(/*! ../Card/index.jsx */ \"./src/js/components/Card/index.jsx\");\n\nvar Filter = __webpack_require__(/*! ../Filter/index.jsx */ \"./src/js/components/Filter/index.jsx\");\n\nvar MobileFilter = __webpack_require__(/*! ../MobileFilter/index.jsx */ \"./src/js/components/MobileFilter/index.jsx\");\n\nvar Modal = __webpack_require__(/*! ../Modal/index.jsx */ \"./src/js/components/Modal/index.jsx\");\n\nvar Cards = function Cards(_ref) {\n  var cards = _ref.cards;\n\n  var _React$useState = React.useState({\n    open: false,\n    content: \"\"\n  }),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      modal = _React$useState2[0],\n      setModal = _React$useState2[1];\n\n  console.log(\"modal\", modal);\n  console.log(\"cards\", cards);\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"page\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"section-order\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"section-order-title\"\n  }, /*#__PURE__*/React.createElement(\"h1\", null, \"Blusas\")), modal.open && /*#__PURE__*/React.createElement(Modal, {\n    title: modal.content,\n    onClose: function onClose() {\n      return setModal({\n        open: false,\n        content: \"\"\n      });\n    }\n  }, modal.content === \"filtrar\" && /*#__PURE__*/React.createElement(MobileFilter, null), modal.content === \"ordernar\" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-container-button\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-order-button\"\n  }, \"Mais recente\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-container-button\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-order-button\"\n  }, \"Maior pre\\xE7o\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-container-button\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-order-button\"\n  }, \"Menor pre\\xE7o\")))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"button-responsive-filters\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-tab\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    onClick: function onClick() {\n      return setModal({\n        open: true,\n        content: \"filtrar\"\n      });\n    },\n    className: \"tab\"\n  }, \"Filtrar\")), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"divider-tab\"\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-tab\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    onClick: function onClick() {\n      return setModal({\n        open: true,\n        content: \"ordernar\"\n      });\n    },\n    className: \"tab\"\n  }, \"Ordernar\"))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"section-order-by\"\n  }, /*#__PURE__*/React.createElement(\"select\", {\n    id: \"orderby\",\n    name: \"orderby\"\n  }, /*#__PURE__*/React.createElement(\"option\", {\n    value: \"\"\n  }, \"Ordenar por:\"), /*#__PURE__*/React.createElement(\"option\", {\n    value: \"recentes\"\n  }, \"Mais recentes\"), /*#__PURE__*/React.createElement(\"option\", {\n    value: \"nenor\"\n  }, \"Menor pre\\xE7o\"), /*#__PURE__*/React.createElement(\"option\", {\n    value: \"maior\"\n  }, \"Maior pre\\xE7o\")))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"section-cards\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-filter\"\n  }, /*#__PURE__*/React.createElement(Filter, null)), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"col-cards\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"row-cards\"\n  }, cards && cards.map(function (card, idx) {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      key: idx,\n      className: \"col-card\"\n    }, /*#__PURE__*/React.createElement(Card, {\n      image: card.image,\n      name: card.name,\n      price: card.price,\n      installment: card.parcelamento[0],\n      installmentValue: card.parcelamento[1],\n      onBuy: function onBuy() {\n        return alert(\"Comprei\" + JSON.stringify(card));\n      }\n    }));\n  })))));\n};\n\nmodule.exports = Cards;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Cards/index.jsx?");

/***/ }),

/***/ "./src/js/components/Checkbox/index.jsx":
/*!**********************************************!*\
  !*** ./src/js/components/Checkbox/index.jsx ***!
  \**********************************************/
/***/ ((module) => {

eval("var Checkbox = function Checkbox(_ref) {\n  var name = _ref.name,\n      value = _ref.value;\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"color-filter\"\n  }, /*#__PURE__*/React.createElement(\"input\", {\n    type: \"checkbox\",\n    id: value,\n    name: value,\n    value: value\n  }), /*#__PURE__*/React.createElement(\"label\", {\n    className: \"label\",\n    htmlFor: value\n  }, name));\n};\n\nmodule.exports = Checkbox;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Checkbox/index.jsx?");

/***/ }),

/***/ "./src/js/components/Filter/index.jsx":
/*!********************************************!*\
  !*** ./src/js/components/Filter/index.jsx ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Checkbox = __webpack_require__(/*! ../Checkbox/index.jsx */ \"./src/js/components/Checkbox/index.jsx\");\n\nvar SizeField = __webpack_require__(/*! ../SizeField/index.jsx */ \"./src/js/components/SizeField/index.jsx\");\n\nvar Filter = function Filter() {\n  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"h2\", null, \"Cores\"), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"checkbox-wrapper\"\n  }, /*#__PURE__*/React.createElement(\"form\", {\n    action: \"/\"\n  }, /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Amarelo\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Azul\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Branco\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Cinza\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Laranja\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Preto\",\n    value: \"true\"\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"button-text\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    id: \"submit\",\n    type: \"submit\"\n  }, \"Ver todas as cores\", /*#__PURE__*/React.createElement(\"svg\", {\n    width: \"9\",\n    height: \"7\",\n    viewBox: \"0 0 9 7\",\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, /*#__PURE__*/React.createElement(\"path\", {\n    d: \"M1 1L4.5 6L8 1.00519\",\n    stroke: \"#666666\",\n    \"stroke-linecap\": \"round\"\n  })))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"size-filter-title\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, \"Tamanhos\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"size-filter-fields\"\n  }, /*#__PURE__*/React.createElement(SizeField, {\n    size: \"P\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"M\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"G\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"GG\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"U\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"36\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"38\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"40\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"36\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"38\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"40\",\n    value: \"true\"\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"amount-filter-title\"\n  }, /*#__PURE__*/React.createElement(\"h2\", null, \"Faixa de pre\\xE7o\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"amount-filter-fields\"\n  }, /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$0 até R$50\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$51 até R$150\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$151 até R$300\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$301 até R$500\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"a partir de R$ 500\",\n    value: \"true\"\n  })))));\n};\n\nmodule.exports = Filter;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Filter/index.jsx?");

/***/ }),

/***/ "./src/js/components/Footer/index.jsx":
/*!********************************************!*\
  !*** ./src/js/components/Footer/index.jsx ***!
  \********************************************/
/***/ ((module) => {

eval("var Footer = function Footer() {\n  return /*#__PURE__*/React.createElement(\"footer\", {\n    className: \"footer\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"page\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"footer-container\"\n  }, /*#__PURE__*/React.createElement(\"span\", {\n    className: \"footer-info\"\n  }, \"M3: Implanta\\xE7\\xE3o de E-commerce VTEX\"))));\n};\n\nmodule.exports = Footer;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Footer/index.jsx?");

/***/ }),

/***/ "./src/js/components/Header/index.jsx":
/*!********************************************!*\
  !*** ./src/js/components/Header/index.jsx ***!
  \********************************************/
/***/ ((module) => {

eval("var Header = function Header() {\n  return /*#__PURE__*/React.createElement(\"header\", {\n    className: \"header\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"page\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"header-container\"\n  }, /*#__PURE__*/React.createElement(\"img\", {\n    id: \"logo\",\n    src: \"../../img/logo-m3.png\"\n  }), /*#__PURE__*/React.createElement(\"img\", {\n    id: \"padlock-icon\",\n    src: \"../../img/padlock.png\"\n  }))));\n};\n\nmodule.exports = Header;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Header/index.jsx?");

/***/ }),

/***/ "./src/js/components/MobileFilter/index.jsx":
/*!**************************************************!*\
  !*** ./src/js/components/MobileFilter/index.jsx ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Checkbox = __webpack_require__(/*! ../Checkbox/index.jsx */ \"./src/js/components/Checkbox/index.jsx\");\n\nvar SizeField = __webpack_require__(/*! ../SizeField/index.jsx */ \"./src/js/components/SizeField/index.jsx\");\n\nvar MobileFilter = function MobileFilter() {\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"filter-modal-mobile\"\n  }, /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-form-option\"\n  }, /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"span\", null, \"Cores\")), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"svg\", {\n    width: \"20\",\n    height: \"15\",\n    viewBox: \"0 0 20 15\",\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, /*#__PURE__*/React.createElement(\"path\", {\n    d: \"M1 1L10 14L19 1.0135\",\n    stroke: \"#666666\",\n    \"stroke-linecap\": \"round\"\n  }))))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"filter-modal-form\"\n  }, /*#__PURE__*/React.createElement(\"form\", null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"filter-modal-form-colors\"\n  }, /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Amarelo\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Azul\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Branco\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Cinza\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Laranja\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"Preto\",\n    value: \"true\"\n  })), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-form-option\"\n  }, /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"span\", null, \"Tamanhos\")), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"svg\", {\n    width: \"20\",\n    height: \"15\",\n    viewBox: \"0 0 20 15\",\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, /*#__PURE__*/React.createElement(\"path\", {\n    d: \"M1 1L10 14L19 1.0135\",\n    stroke: \"#666666\",\n    \"stroke-linecap\": \"round\"\n  }))))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"filter-modal-form-sizes\"\n  }, /*#__PURE__*/React.createElement(SizeField, {\n    size: \"P\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"M\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"G\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"GG\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"U\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"36\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"38\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"40\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"36\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"38\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(SizeField, {\n    size: \"40\",\n    value: \"true\"\n  })), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-form-option\"\n  }, /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"span\", null, \"Faixa de pre\\xE7os\")), /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"svg\", {\n    width: \"20\",\n    height: \"15\",\n    viewBox: \"0 0 20 15\",\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, /*#__PURE__*/React.createElement(\"path\", {\n    d: \"M1 1L10 14L19 1.0135\",\n    stroke: \"#666666\",\n    \"stroke-linecap\": \"round\"\n  }))))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"filter-modal-form-prices\"\n  }, /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$0 até R$50\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$51 até R$150\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$151 até R$300\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"de R$301 até R$500\",\n    value: \"true\"\n  }), /*#__PURE__*/React.createElement(Checkbox, {\n    name: \"a partir de R$ 500\",\n    value: \"true\"\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-filter-buttons\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-filter-button-apply\"\n  }, \"Aplicar\"), /*#__PURE__*/React.createElement(\"button\", {\n    className: \"modal-filter-button-cancel\"\n  }, \"Limpar\")))));\n};\n\nmodule.exports = MobileFilter;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/MobileFilter/index.jsx?");

/***/ }),

/***/ "./src/js/components/Modal/index.jsx":
/*!*******************************************!*\
  !*** ./src/js/components/Modal/index.jsx ***!
  \*******************************************/
/***/ ((module) => {

eval("var Modal = function Modal(_ref) {\n  var title = _ref.title,\n      onClose = _ref.onClose,\n      children = _ref.children;\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal\"\n  }, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-header\"\n  }, /*#__PURE__*/React.createElement(\"span\", {\n    className: \"modal-header-title\"\n  }, title), /*#__PURE__*/React.createElement(\"button\", {\n    onClick: onClose,\n    className: \"modal-header-button\"\n  }, /*#__PURE__*/React.createElement(\"svg\", {\n    width: \"19\",\n    height: \"20\",\n    viewBox: \"0 0 19 20\",\n    fill: \"none\",\n    xmlns: \"http://www.w3.org/2000/svg\"\n  }, /*#__PURE__*/React.createElement(\"path\", {\n    d: \"M0.5 18.852L17.5547 1.00001\",\n    stroke: \"black\"\n  }), /*#__PURE__*/React.createElement(\"line\", {\n    y1: \"-0.5\",\n    x2: \"25.2899\",\n    y2: \"-0.5\",\n    transform: \"matrix(0.711746 0.702437 -0.874311 0.485367 0 1.23547)\",\n    stroke: \"black\"\n  })))), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"modal-content\"\n  }, children));\n};\n\nmodule.exports = Modal;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/Modal/index.jsx?");

/***/ }),

/***/ "./src/js/components/SizeField/index.jsx":
/*!***********************************************!*\
  !*** ./src/js/components/SizeField/index.jsx ***!
  \***********************************************/
/***/ ((module) => {

eval("var SizeField = function SizeField(_ref) {\n  var size = _ref.size,\n      value = _ref.value;\n  return /*#__PURE__*/React.createElement(\"div\", {\n    className: \"size-field-card\"\n  }, /*#__PURE__*/React.createElement(\"span\", {\n    className: \"size-field-text\"\n  }, size));\n};\n\nmodule.exports = SizeField;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/components/SizeField/index.jsx?");

/***/ }),

/***/ "./src/js/index.jsx":
/*!**************************!*\
  !*** ./src/js/index.jsx ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var HomePage = __webpack_require__(/*! ./pages/HomePage.jsx */ \"./src/js/pages/HomePage.jsx\");\n\nvar serverurl = \"http://localhost:5000\";\n\nfunction main() {\n  var container = document.getElementById('react-app');\n  var root = ReactDOM.createRoot(container);\n  root.render( /*#__PURE__*/React.createElement(HomePage, null));\n}\n\nwindow.onload = main;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/index.jsx?");

/***/ }),

/***/ "./src/js/pages/HomePage.jsx":
/*!***********************************!*\
  !*** ./src/js/pages/HomePage.jsx ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Header = __webpack_require__(/*! ../components/Header/index.jsx */ \"./src/js/components/Header/index.jsx\");\n\nvar Cards = __webpack_require__(/*! ../components/Cards/index.jsx */ \"./src/js/components/Cards/index.jsx\");\n\nvar Footer = __webpack_require__(/*! ../components/Footer/index.jsx */ \"./src/js/components/Footer/index.jsx\");\n\nvar Cards_mock = __webpack_require__(/*! ../../../db.json */ \"./db.json\");\n\nvar HomePage = function HomePage() {\n  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Cards, {\n    cards: Cards_mock.products\n  }), /*#__PURE__*/React.createElement(Footer, null));\n};\n\nmodule.exports = HomePage;\n\n//# sourceURL=webpack://desenvolvedor-m3/./src/js/pages/HomePage.jsx?");

/***/ }),

/***/ "./db.json":
/*!*****************!*\
  !*** ./db.json ***!
  \*****************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"products\":[{\"id\":\"1\",\"name\":\"Camiseta Mescla\",\"price\":28.8,\"parcelamento\":[3,9.33],\"color\":\"Cinza\",\"image\":\"/img/img_2.png\",\"size\":[\"M\",\"GG\"],\"date\":\"1995-12-17\"},{\"id\":\"2\",\"name\":\"Saia em couro\",\"price\":398,\"parcelamento\":[5,30],\"color\":\"Preto\",\"image\":\"/img/img_3.png\",\"size\":[\"G\",\"40\"],\"date\":\"1996-12-17\"},{\"id\":\"3\",\"name\":\"Cardigan Tigre\",\"price\":398.8,\"parcelamento\":[5,30],\"color\":\"Laranja\",\"image\":\"/img/img_4.png\",\"size\":[\"GG\",\"44\"],\"date\":\"1997-12-17\"},{\"id\":\"4\",\"name\":\"Cardigan off white\",\"price\":99.9,\"parcelamento\":[3,33.3],\"color\":\"Branco\",\"image\":\"/img/img_5.png\",\"size\":[\"U\",\"46\"],\"date\":\"1998-12-17\"},{\"id\":\"5\",\"name\":\"Body Leopardo\",\"price\":129.9,\"parcelamento\":[3,43.43],\"color\":\"Amarelo\",\"image\":\"/img/img_6.png\",\"size\":[\"M\"],\"date\":\"1999-12-17\"},{\"id\":\"6\",\"name\":\"Casaco Pelos\",\"price\":398,\"parcelamento\":[5,30],\"color\":\"Rosa\",\"image\":\"/img/img_7.png\",\"size\":[\"GG\",\"38\"],\"date\":\"1999-12-16\"},{\"id\":\"7\",\"name\":\"Cropped Stripes\",\"price\":120,\"parcelamento\":[3,40],\"color\":\"Amarelo\",\"image\":\"/img/img_8.png\",\"size\":[\"36\",\"U\"],\"date\":\"2000-12-17\"},{\"id\":\"8\",\"name\":\"Camisa Transparente\",\"price\":398,\"parcelamento\":[5,30],\"color\":\"Preto\",\"image\":\"/img/img_9.png\",\"size\":[\"P\"],\"date\":\"2000-11-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"},{\"id\":\"9\",\"name\":\"Pochete Clutch\",\"price\":99,\"parcelamento\":[3,33],\"color\":\"Preto\",\"image\":\"/img/img_10.png\",\"size\":[\"M\"],\"date\":\"2003-12-17\"}]}');\n\n//# sourceURL=webpack://desenvolvedor-m3/./db.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.jsx");
/******/ 	
/******/ })()
;