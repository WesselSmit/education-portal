(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var search = _interopRequireWildcard(require("./modules/search.mjs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var searchBar = document.getElementById('search-bar'); //control search-reset icon 

searchBar.addEventListener('focus', function () {
  return search.showReset();
});
searchBar.addEventListener('blur', function () {
  return search.hideReset();
}); //reset search input

var searchResetIcon = document.getElementById('search-reset');
searchResetIcon.addEventListener('click', function (e) {
  return search.reset(e);
}); //listen to keyboard input

document.addEventListener('keypress', function (e) {
  switch (e.key) {
    case "/":
      search.focus(e); //give searchbar focus and hide search-reset icon

      break;
  }
});

},{"./modules/search.mjs":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focus = focus;
exports.showReset = showReset;
exports.hideReset = hideReset;
exports.reset = reset;
var searchBar = document.getElementById('search-bar');
var searchResetIcon = document.getElementById('search-reset');

function focus(e) {
  e.preventDefault();
  searchBar.focus();
}

function showReset() {
  searchResetIcon.classList.remove('hide');
}

function hideReset() {
  if (searchBar.value === "") {
    searchResetIcon.classList.add('hide');
  }
}

function reset(e) {
  searchBar.value = "";
  focus(e);
}

},{}]},{},[1])

//# sourceMappingURL=index.js.map
