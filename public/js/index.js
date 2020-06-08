(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = _interopRequireWildcard(require("./modules/utils.mjs"));

var search = _interopRequireWildcard(require("./modules/search.mjs"));

var _togglePreferences = _interopRequireDefault(require("./modules/togglePreferences.mjs"));

var _urgentAnnouncement = _interopRequireDefault(require("./web-components/urgent-announcement.mjs"));

var _studyProgress = require("./web-components/study-progress.mjs");

var _schedule = require("./web-components/schedule.mjs");

var _courseOverview = require("./web-components/course-overview.mjs");

var _announcements = require("./web-components/announcements.mjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var page = document.querySelector('main').id.toLowerCase(); //init dashboard

if (page === 'dashboard') {
  var domElements;
  var widgetElements;
  var preferences = (0, utils.getLocalStorage)('preferences');

  if (preferences) {
    var _checker = checker(preferences);

    var _checker2 = _slicedToArray(_checker, 2);

    domElements = _checker2[0];
    widgetElements = _checker2[1];
  } else {
    domElements = ['announcements', 'study-progress', 'course-overview', 'schedule'];
    widgetElements = ['announcements-widget', 'study-progress', 'course-overview', 'schedule-widget'];
  }

  appendWidgets(domElements, widgetElements);
}

if (page === 'account') {
  (0, _togglePreferences["default"])();
}

if (page === 'announcements-overview') {
  var announcementList = document.getElementById('announcements');
  announcementList.remove();
  document.querySelector('main section').append(document.createElement('announcements-widget'));
  (0, _announcements.WC_announcementsWidget)(page);
}

function appendWidgets(domEl, widget) {
  // Remove EJS templates
  var domElements = ['announcements', 'study-progress', 'course-overview', 'schedule'];
  domElements.forEach(function (element) {
    return document.getElementById(element).remove();
  }); // Adding widgets

  widget.forEach(function (item) {
    document.querySelector('main section').append(document.createElement(item));

    if (item === 'study-progress') {
      (0, _studyProgress.WC_studyprogress)();
    }

    if (item === 'course-overview') {
      (0, _courseOverview.WC_courseoverview)();
    }

    if (item === 'schedule-widget') {
      (0, _schedule.WC_scheduleWidget)();
    }

    if (item === 'announcements-widget') {
      (0, _announcements.WC_announcementsWidget)(page);
    }
  });
}

function checker(preferences) {
  var domElements = [];
  var widgetElements = []; // Announcements

  preferences.forEach(function (preference) {
    preference.id = parseInt(preference.id);

    if (preference.state && preference.id === 0) {
      domElements.push('announcements');
      widgetElements.push('announcements-widget');
    }

    if (preference.state && preference.id === 1) {
      domElements.push('study-progress');
      widgetElements.push('study-progress');
    }

    if (preference.state && preference.id === 2) {
      domElements.push('course-overview');
      widgetElements.push('course-overview');
    }

    if (preference.state && preference.id === 3) {
      domElements.push('schedule');
      widgetElements.push('schedule-widget');
    }
  });
  return [domElements, widgetElements];
} //check if browser is online


if (navigator.onLine) {
  //urgent announcements
  var socket = io(); //subscribe to urgent-announcements

  socket.emit('join', page); //on urgent-announcement hook update interface (see WC_urgentAnnouncement)

  socket.on('urgent-announcement', function (announcement) {
    var urgentAnnouncement = document.querySelector('urgent-announcement');

    if (utils.exists([urgentAnnouncement])) {
      urgentAnnouncement.setAttribute('message', announcement.title);
      urgentAnnouncement.setAttribute('uid', announcement.newsItemId);
    }
  });
} //menu 


var menuIcon = document.getElementById('menu-icon');
var menu = document.getElementById('menu');

if (utils.exists([menuIcon, menu])) {
  //toggle menu (on mobile)
  menuIcon.addEventListener('click', function () {
    menu.classList.toggle('hide');
  });
} //search 


var searchBar = document.getElementById('search-bar');
var searchResetIcon = document.getElementById('search-reset');
var searchIcon = document.querySelector('#search-container input[type=submit]');

if (utils.exists([searchBar, searchResetIcon, searchIcon])) {
  //control search-reset icon 
  searchBar.addEventListener('focus', function () {
    return search.showReset();
  });
  searchBar.addEventListener('blur', function () {
    return search.hideReset();
  }); //reset search input

  searchResetIcon.addEventListener('click', function (e) {
    return search.reset(e);
  }); //depending on search-query either give focus to searchbar or submit search-query

  searchIcon.addEventListener('click', function (e) {
    if (searchBar.value === "") {
      search.focus(e);
    }
  }); //listen to keyboard input

  document.addEventListener('keypress', function (e) {
    switch (e.key) {
      case "/":
        search.focus(e); //give searchbar focus and hide search-reset icon

        break;
    }
  });
}

},{"./modules/search.mjs":2,"./modules/togglePreferences.mjs":3,"./modules/utils.mjs":4,"./web-components/announcements.mjs":5,"./web-components/course-overview.mjs":6,"./web-components/schedule.mjs":7,"./web-components/study-progress.mjs":8,"./web-components/urgent-announcement.mjs":9}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = togglePreferences;

var _utils = require("../modules/utils.mjs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var container = document.querySelector('#account form');

function togglePreferences() {
  container.classList.remove('disabled');
  var savedPreferences = (0, _utils.getLocalStorage)('preferences');

  if (savedPreferences) {
    container.textContent = '';
    savedPreferences.forEach(function (preference) {
      return container.append(createLabels(preference));
    });
  } else {
    setPreferencesObject();
  }

  var inputs = _toConsumableArray(document.querySelectorAll('#account form label'));

  inputs.forEach(function (label) {
    stateHandler(label);
    dragHandler(label);
  });
  orderHandler();
} // Manipulating the order of the DOM


function orderHandler() {
  container.addEventListener('dragover', function (event) {
    event.preventDefault();
    var afterElement = getElementAfterDrag(event.clientY);
    var draggable = document.querySelector('.dragging');
    afterElement === null ? container.appendChild(draggable) : container.insertBefore(draggable, afterElement);
  });
}

function getElementAfterDrag(y) {
  var draggableElements = _toConsumableArray(container.querySelectorAll('label:not(.dragging)'));

  return draggableElements.reduce(function (closest, child) {
    var box = child.getBoundingClientRect();
    var offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: child
      };
    } else {
      return closest;
    }
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element;
}

function dragHandler(label) {
  label.addEventListener('dragstart', function () {
    label.classList.add('dragging');
  });
  label.addEventListener('dragend', function () {
    label.classList.remove('dragging');
    setPreferencesObject();
  });
} // Saving and changing preferences 


function setPreferencesObject() {
  var inputs = _toConsumableArray(document.querySelectorAll('#account form label'));

  var preferences = [];
  inputs.forEach(function (label) {
    // Data
    var id = label.id;
    var text = label.textContent;
    var state = label.querySelector('input').checked; // Set LocalStorage

    var object = {
      id: id,
      name: text,
      state: state
    };
    preferences.push(object);
    (0, _utils.setLocalStorage)('preferences', preferences);
  });
  return preferences;
}

function stateHandler(label) {
  label.addEventListener('change', function (event) {
    // Data
    var id = label.id;
    var state = event.target.checked; // Change LocalStorage

    var data = (0, _utils.getLocalStorage)('preferences');
    var preference = data.find(function (preference) {
      return preference.id === id;
    });
    preference.state = state;
    (0, _utils.setLocalStorage)('preferences', data); // Change look

    label.classList.toggle('off');
  });
} // Rearanging order


function createLabels(preference) {
  var label = document.createElement('label');
  label.id = preference.id;
  label.draggable = true;
  preference.state ? label.className = 'on' : label.className = 'off';
  var input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = preference.state;
  label.append(input);
  label.append(preference.name);
  return label;
}

},{"../modules/utils.mjs":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = exists;
exports.setLocalStorage = setLocalStorage;
exports.getLocalStorage = getLocalStorage;
exports.storageAvailable = storageAvailable;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function exists(_ref) {
  var _ref2 = _toArray(_ref),
      variables = _ref2.slice(0);

  var exists = variables.every(function (variable) {
    return variable != null;
  });
  return exists;
}

function setLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

function getLocalStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

function storageAvailable(type) {
  //source: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  var storage;

  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage && storage.length !== 0;
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WC_announcementsWidget = init;

var utils = _interopRequireDefault(require("../modules/utils.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n<style>\nh2 {\n    font-size: 24px;\n    color: #25167A;\n    text-transform: uppercase;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #DDDDDD;\n    margin: 0 0 15px 0;\n\tfont-family: \"OpenSans-Regular\", sans-serif, Arial, Helvetica;\n\tfont-weight: lighter;\n\tline-height: 1.1;\n}\np {\n\tmargin: 0;\n}\n.announcements-container #announcement-legend {\n\tmargin-bottom: 20px;\n}\n.announcements-container #announcement-legend p {\n\tcolor: black;\n\tfont-size: 14px;\n\tdisplay: inline-block;\n\tmargin-right: 20px;\n}\n.announcements-container #announcement-legend p:last-of-type {\n\tmargin-right: 0;\n}\n.announcements-container #announcement-legend p::before {\n\tcontent: \"\";\n\theight: 15px;\n\tmargin-bottom: -2px;\n\twidth: 15px;\n\tmargin-right: 10px;\n\tdisplay: inline-block;\n}\n.announcements-container #announcement-legend p.Opleiding::before {\n\tbackground-color: #DC143C;\n}\n.announcements-container #announcement-legend p.Faculteit::before {\n\tbackground-color: #DCB614;\n}\n.announcements-container #announcement-legend p.HvA::before {\n\tbackground-color: #149EDC;\n}\n.announcements-container #announcement-legend p.Medezeggenschap::before {\n\tbackground-color: #14DC69;\n}\n.announcements-container a {\n\tmargin: 0 0 15px 0;\n\tdisplay: block;\n\tcolor: black;\n\ttext-decoration: none;\n}\n.announcements-container a:hover {\n\tbackground-color: #F2F2F2;\n}\n.announcements-container a:focus {\n\tbackground-color: #DDDDDD;\n}\n.announcements-container .announcement {\n\tmargin: 0;\n\tpadding: 5px 0 5px 10px;\n\tborder-left: 5px solid;\n}\n.announcements-container .announcement.Opleiding {\n\tborder-color: #DC143C;\n}\n.announcements-container .announcement.Faculteit {\n\tborder-color: #DCB614;\n}\n.announcements-container .announcement.HvA {\n\tborder-color: #149EDC;\n}\n.announcements-container .announcement.Medezeggenschap {\n\tborder-color: #14DC69;\n}\n.announcements-container .announcement p:first-of-type {\n    font-family: \"OpenSans-Bold\", sans-serif, Arial, Helvetica;\n}\n.announcements-container .read .announcement p:first-of-type {\n    font-family: \"OpenSans-Regular\", sans-serif, Arial, Helvetica;\n}\n.announcements-container .announcement p:last-of-type {\n\tcolor: #666666;\n\tfont-size: 14px;\n}    \n.allAnnouncements {\n    margin-top: 30px;\n    text-decoration: none;\n    color: #25167A;\n    display: flex;\n\talign-items: center;\n}\n.allAnnouncements:hover,\n.allAnnouncements:focus {\n        text-decoration: underline;\n}\n.allAnnouncements img {\n        height: 12px;\n        margin-left: 20px;\n}\n</style>\n<div id=\"announcements\"></div>\n<h2>Mededelingen</h2>\n<div class=\"announcements-container\">\n\t<div id=\"announcement-legend\"></div>\n</div>\n<a class=\"allAnnouncements\" href=\"/announcements/\" target=\"_self\">Alle mededelingen\n\t<img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</a>";

function init(pageName) {
  var announcementList = /*#__PURE__*/function (_HTMLElement) {
    _inherits(announcementList, _HTMLElement);

    var _super = _createSuper(announcementList);

    function announcementList() {
      var _this;

      _classCallCheck(this, announcementList);

      _this = _super.call(this);

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      _this.getData().then(function (json) {
        var _json = _slicedToArray(json, 2),
            announcements = _json[0],
            categories = _json[1];

        _this.createLegenda(categories);

        if (pageName === 'dashboard') {
          announcements.splice(5, announcements.length);
        }

        _this.appendAnnouncements(announcements);
      });

      _this.announcementContainer = _this.shadowRoot.querySelector('.announcements-container');
      _this.announcementLegend = _this.shadowRoot.querySelector('#announcement-legend');
      return _this;
    }

    _createClass(announcementList, [{
      key: "getData",
      value: function getData() {
        var options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch('/announcementslist', options).then(function (res) {
          return res.json();
        });
      }
    }, {
      key: "createLegenda",
      value: function createLegenda(categories) {
        var _this2 = this;

        categories.forEach(function (cat) {
          _this2.announcementLegend.insertAdjacentHTML('beforeend', "<p class=\"".concat(cat, "\">").concat(cat, "</p>"));
        });
      }
    }, {
      key: "appendAnnouncements",
      value: function appendAnnouncements(announcements) {
        var _this3 = this;

        announcements.forEach(function (announcement) {
          _this3.announcementContainer.insertAdjacentHTML('beforeend', "\n\t\t\t\t<a href=\"/announcements/".concat(announcement.newsItemId, "\" target=\"_self\" uid=\"").concat(announcement.newsItemId, "\">\n\t\t\t\t\t<div class=\"announcement ").concat(announcement.tags[0], "\" id=\"").concat(announcement.newsItemId, "\">\n                \t\t<p>").concat(announcement.title, "</p>\n                \t\t<p>").concat(announcement.publishDate, " - ").concat(announcement.tags[0], "</p>\n           \t\t\t</div>\n\t\t\t\t</a>"));

          if (utils.storageAvailable('localStorage')) {
            var storedHistory = utils.getLocalStorage('read-history');
            _this3.readHistory = storedHistory ? storedHistory : [];

            var link = _this3.announcementContainer.querySelector('a:last-of-type');

            if (_this3.readHistory.includes(link.getAttribute('uid'))) {
              link.classList.add('read');
            }

            link.addEventListener('click', function () {
              return _this3.store(link);
            });
          }
        });
      }
    }, {
      key: "store",
      value: function store(announcement) {
        this.readHistory.push(announcement.getAttribute('uid'));
        utils.setLocalStorage('read-history', this.readHistory);
      }
    }]);

    return announcementList;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  window.customElements.define('announcements-widget', announcementList);
}

},{"../modules/utils.mjs":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WC_courseoverview = init;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n<style>\nh2 {\n    font-size: 24px;\n    color: #25167A;\n    text-transform: uppercase;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #DDDDDD;\n    margin: 0 0 15px 0;\n\tfont-family: \"OpenSans-Regular\", sans-serif, Arial, Helvetica;\n\tfont-weight: lighter;\n\tline-height: 1.1;\n}\n\np {\n\tmargin: 0;\n}\n\n.navigator {\n    background-color: #DDDDDD;\n    padding: 5px 10px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    color: #25167A;\n    font-size: 16px;\n}\n\n.navigator span  {\n    cursor: default;\n}\n\n.navigator img {\n    padding: 10px;\n}\n\n.navigator img:not(.disabled) {\n    cursor: pointer;\n}\n\n.navigator img.disabled {\n    pointer-events: none;\n    opacity: .5;\n}\n\n.course {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-column-gap: 20px;\n    padding: 15px 20px;\n    border-bottom: 1px solid #DDDDDD;\n}\n\n.course p:first-of-type {\n    font-family: \"OpenSans-Bold\", sans-serif, Arial, Helvetica;\n    align-self: center;\n}\n\n.course ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    align-self: center;\n}\n\n.course ul li {\n    display: inline;\n}\n\n.course ul li:not(:last-of-type):after {\n    content: \", \";\n    white-space: pre;\n}\n\na {\n    margin-top: 30px;\n    text-decoration: none;\n    color: #25167A;\n    display: flex;\n    align-items: center;\n}\n\na:hover,\na:focus {\n    text-decoration: underline;\n    outline: none;\n}\n\na img {\n    height: 12px;\n    margin-left: 20px;\n}\n</style>\n\n<h2>Vakkenoverzicht</h2>\n\n<div class=\"navigator\">\n    <img src=\"/media/icons/arrow-left.svg\" alt=\"arrow-left\"></img>\n    <span></span>\n    <img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</div>\n\n<div id=\"course-overview\"></div>\n\n<a target=\"_blank\" href=\"https://sis.hva.nl/\">Volledig overzicht\n    <img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</a>\n";

function init() {
  var CourseOverview = /*#__PURE__*/function (_HTMLElement) {
    _inherits(CourseOverview, _HTMLElement);

    var _super = _createSuper(CourseOverview);

    function CourseOverview() {
      var _this;

      _classCallCheck(this, CourseOverview);

      // Setup
      _this = _super.call(this);

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true)); // Variables


      _this.courseContainer = _this.shadowRoot.querySelector('#course-overview');
      _this.courseMoment = _this.shadowRoot.querySelector('.navigator span');
      _this.arrowPrevious = _this.shadowRoot.querySelector('.navigator img:first-of-type');
      _this.arrowNext = _this.shadowRoot.querySelector('.navigator img:last-of-type');
      _this.yearIndex = 2;
      _this.quarterIndex = 3; // Data

      _this.data = _this.getData().then(function (json) {
        _this.navigateHandler();

        var data = json[_this.yearIndex].quarters[_this.quarterIndex].courses;

        _this.updateCourseOverview(data);

        _this.data = json;
      }); // EventListeners

      _this.arrowPrevious.addEventListener('click', function () {
        return _this.navigate('previous');
      });

      _this.arrowNext.addEventListener('click', function () {
        return _this.navigate('next');
      });

      return _this;
    }

    _createClass(CourseOverview, [{
      key: "updateNavigator",
      value: function updateNavigator() {
        this.courseMoment.textContent = "Jaar ".concat(this.yearIndex + 1, " - Blok ").concat(this.quarterIndex + 1);
      }
    }, {
      key: "updateCourseOverview",
      value: function updateCourseOverview(courses) {
        var _this2 = this;

        this.courseContainer.textContent = "";
        this.updateNavigator();
        courses.forEach(function (course) {
          var div = document.createElement('div');
          div.classList.add('course');
          var courseName = document.createElement('p');
          courseName.textContent = course.course;
          div.append(courseName);
          var list = document.createElement('ul');
          course.lecturers.forEach(function (lecturer) {
            var teacher = document.createElement('li');
            lecturer === "" ? teacher.textContent = 'Geen specifieke docent' : teacher.textContent = lecturer;
            list.append(teacher);
          });
          div.append(list);

          _this2.courseContainer.append(div);
        });
      }
    }, {
      key: "navigate",
      value: function navigate(direction) {
        if (direction === 'previous') {
          if (this.quarterIndex > 0) {
            this.quarterIndex--;
          } else if (this.quarterIndex === 0 && this.yearIndex > 0) {
            this.quarterIndex = 3;
            this.yearIndex--;
          }
        }

        if (direction === 'next') {
          if (this.quarterIndex < 3) {
            this.quarterIndex++;
          } else if (this.quarterIndex === 3 && this.yearIndex < 3) {
            this.quarterIndex = 0;
            this.yearIndex++;
          }
        }

        this.navigateHandler();
        var data = this.data[this.yearIndex].quarters[this.quarterIndex].courses;
        this.updateCourseOverview(data);
      }
    }, {
      key: "navigateHandler",
      value: function navigateHandler() {
        this.yearIndex === 0 && this.quarterIndex === 0 ? this.arrowPrevious.classList.add('disabled') : this.arrowPrevious.classList.remove('disabled');
        this.yearIndex === 3 && this.quarterIndex === 3 ? this.arrowNext.classList.add('disabled') : this.arrowNext.classList.remove('disabled');
      } // Helpers

    }, {
      key: "getData",
      value: function getData() {
        var options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch('/courseoverview', options).then(function (res) {
          return res.json();
        });
      }
    }]);

    return CourseOverview;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  customElements.define('course-overview', CourseOverview);
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WC_scheduleWidget = init;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n<style>\nh2 {\n    font-size: 24px;\n    color: #25167A;\n    text-transform: uppercase;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #DDDDDD;\n    margin: 0 0 15px 0;\n\tfont-family: \"OpenSans-Regular\", sans-serif, Arial, Helvetica;\n\tfont-weight: lighter;\n\tline-height: 1.1;\n}\n\np {\n\tmargin: 0;\n}\n\n.navigator {\n    background-color: #DDDDDD;\n    padding: 5px 10px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    color: #25167A;\n    font-size: 16px;\n}\n\n.navigator span  {\n    cursor: default;\n}\n\n.navigator img {\n    padding: 10px;\n}\n\n.navigator img:not(.disabled) {\n    cursor: pointer;\n}\n\n.navigator img.disabled {\n    pointer-events: none;\n    opacity: .5;\n}\n\n.schedule-course {\n    display: grid;\n    grid-template-columns: auto 1fr;\n    grid-column-gap: 20px;\n    grid-row-gap: 5px;\n    padding: 15px 20px;\n    border-bottom: 1px solid #DDDDDD;\n}\n\n.schedule-course p:first-of-type,\n.schedule-course p:nth-of-type(3) {\n    font-family: \"OpenSans-Bold\", sans-serif, Arial, Helvetica;\n}\n\na {\n    margin-top: 30px;\n    text-decoration: none;\n    color: #25167A;\n    display: flex;\n    align-items: center;\n}\n\na:hover,\na:focus {\n    text-decoration: underline;\n    outline: none;\n}\n\na img {\n    height: 12px;\n    margin-left: 20px;\n}\n</style>\n<h2>Dagrooster</h2>\n<div class=\"navigator\">\n\t<img src=\"/media/icons/arrow-left.svg\" alt=\"arrow-left\" class=\"disabled\"></img>\n\t<span></span>\n\t<img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</div>\n<div id=\"schedules-container\"></div>\n<a target=\"_blank\" href=\"https://rooster.hva.nl/schedule\">Volledig rooster\n\t<img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</a>\n";

function init() {
  var schedule = /*#__PURE__*/function (_HTMLElement) {
    _inherits(schedule, _HTMLElement);

    var _super = _createSuper(schedule);

    function schedule() {
      var _this;

      _classCallCheck(this, schedule);

      _this = _super.call(this);

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      _this.data = _this.getData().then(function (json) {
        _this.updateSchedule(json[0]);

        _this.data = json;
      });
      _this.navigator = _this.shadowRoot.querySelector('.navigator');
      _this.arrowPrevious = _this.navigator.querySelector('img:first-of-type');
      _this.arrowNext = _this.navigator.querySelector('img:last-of-type');

      _this.arrowNext.addEventListener('click', function () {
        return _this.navigate('next');
      });

      _this.arrowPrevious.addEventListener('click', function () {
        return _this.navigate('previous');
      });

      _this.index = 0;
      return _this;
    }

    _createClass(schedule, [{
      key: "getData",
      value: function getData() {
        var options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch('/schedule', options).then(function (res) {
          return res.json();
        });
      }
    }, {
      key: "updateSchedule",
      value: function updateSchedule(data) {
        var schedulesContainer = this.shadowRoot.getElementById('schedules-container');
        schedulesContainer.textContent = "";
        this.navigator.querySelector('span').textContent = "".concat(data.day, "-").concat(data.month, "-").concat(data.year);
        data.schedules.forEach(function (schedule) {
          var classRoom = schedule._embedded ? schedule._embedded.rooms[0].abbreviation : "Geen lokaal";
          var div = document.createElement('div');
          div.classList.add('schedule-course');
          schedulesContainer.appendChild(div);
          var time = document.createElement('p');
          time.textContent = "".concat(schedule.startDateTime.time, " - ").concat(schedule.endDateTime.time);
          div.appendChild(time);
          var name = document.createElement('p');
          name.textContent = schedule._links.courses[0].title;
          div.appendChild(name);
          var room = document.createElement('p');
          room.textContent = classRoom;
          div.appendChild(room);
          var teacher = document.createElement('p');
          teacher.textContent = schedule._links.lecturers[0].title;
          div.appendChild(teacher);
        });
      }
    }, {
      key: "navigate",
      value: function navigate(direction) {
        direction === 'previous' ? this.index-- : this.index++;
        this.index === 0 ? this.arrowPrevious.classList.add('disabled') : this.arrowPrevious.classList.remove('disabled');
        this.index === 4 ? this.arrowNext.classList.add('disabled') : this.arrowNext.classList.remove('disabled');
        this.updateSchedule(this.data[this.index]);
      }
    }]);

    return schedule;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  window.customElements.define('schedule-widget', schedule);
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WC_studyprogress = init;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
template.innerHTML = "\n<style>\nh2 {\n    font-size: 24px;\n    color: #25167A;\n    text-transform: uppercase;\n    padding-bottom: 8px;\n    border-bottom: 1px solid #DDDDDD;\n    margin: 0 0 15px 0;\n    font-family: \"OpenSans-Regular\", sans-serif, Arial, Helvetica;\n    font-weight: lighter;\n    line-height: 1.1;\n}\n\np {\n    margin: 0;\n}\n\n#recent-results div {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n    grid-template-rows: 1fr auto;\n}\n\n#recent-results div:not(:last-of-type) {\n    margin-bottom: 15px;\n}\n\n#recent-results span {\n    display: block;\n    grid-column: 1 / 2;\n    grid-row: 1 / 3;\n    width: 5px;\n    height: 100%;\n}\n\nspan.success {\n    background-color: #25167A;\n}\n\nspan.failed {\n    background-color: #DDDDDD;\n}\n\n#recent-results p:nth-of-type(1) {\n    grid-column: 2 / 3;\n    padding: 4px 0px 0px 10px;\n}\n\n#recent-results p:nth-of-type(2) {\n    grid-row: 1 / 3;\n    grid-column: 3 / 4;\n    align-self: center;\n}\n\n#recent-results p:nth-of-type(3) {\n    padding: 0px 0px 4px 10px;\n    font-size: 14px;\n    color: #666666;\n}\n\n#recent-results p:nth-of-type(1),\n#recent-results p:nth-of-type(2) {\n    font-family: \"OpenSans-Bold\", sans-serif, Arial, Helvetica;\n\n}\n\n#recent-progress {\n    margin-top: 30px;\n}\n\n#recent-progress div {\n    display: grid;\n    grid-template-columns: auto 1fr auto;\n}\n\n#recent-progress div span {\n        display: block;\n        width: 5px;\n}\n\n#recent-progress p {\n    padding: 5px 0px;\n}\n\n#recent-progress p:first-of-type {\n    padding-left: 10px;\n}\n\n#recent-progress .current-year {\n    background-color: #DDDDDD;\n}\n\n#recent-progress .current-year span {\n    background-color: #25167A;\n}\n\n#recent-progress .current-year p {\n    font-family: \"OpenSans-Bold\", sans-serif, Arial, Helvetica;\n}\n\n#recent-progress .current-year p:last-of-type {\n    padding-right: 10px;\n}\n\na {\n    margin-top: 30px;\n    text-decoration: none;\n    color: #25167A;\n    display: flex;\n    align-items: center;\n}\n\na:hover,\na:focus {\n    text-decoration: underline;\n    outline: none;\n}\n\na img {\n    height: 12px;\n    margin-left: 20px;\n}\n</style>\n\n<h2>Studieresultaten en -voortgang</h2>\n\n<div id=\"recent-results\"></div>\n<div id=\"recent-progress\"></div>\n\n<a target=\"_blank\" href=\"https://sis.hva.nl/\">Alle resultaten in SIS\n    <img src=\"/media/icons/arrow-right.svg\" alt=\"arrow-right\"></img>\n</a>\n";

function init() {
  var StudyProgress = /*#__PURE__*/function (_HTMLElement) {
    _inherits(StudyProgress, _HTMLElement);

    var _super = _createSuper(StudyProgress);

    function StudyProgress() {
      var _this;

      _classCallCheck(this, StudyProgress);

      // Setup
      _this = _super.call(this);

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      _this.getData().then(function (json) {
        var _json = _slicedToArray(json, 2),
            results = _json[0],
            progress = _json[1];

        _this.resultComponent(results);

        _this.progressComponent(progress);
      });

      _this.resultsContainer = _this.shadowRoot.querySelector('#recent-results');
      _this.progressContainer = _this.shadowRoot.querySelector('#recent-progress');
      return _this;
    }

    _createClass(StudyProgress, [{
      key: "progressComponent",
      value: function progressComponent(results) {
        var _this2 = this;

        results.forEach(function (result) {
          var div = document.createElement('div');

          if (result.currentYear) {
            div.classList.add('current-year');
          }

          var template = "\n                <span></span>\n                <p>Leerjaar ".concat(result.studyYear, "</p>\n                <p>").concat(result.studypoints.achieved, "/").concat(result.studypoints.available, " studiepunten</p>"); // InsertAdjacentHtml
          // Template engine uitzoeken voor Webcomponents

          div.innerHTML = template;

          _this2.progressContainer.append(div);
        });
      }
    }, {
      key: "resultComponent",
      value: function resultComponent(results) {
        var _this3 = this;

        results.forEach(function (result) {
          // Parent container
          var div = document.createElement('div');
          var indicator;

          if (typeof result.grade === 'number' && result.grade >= 5.5 || result.grade === 'V') {
            indicator = "<span class=\"success\"></span>";
          } else if (typeof result.grade === 'number' && result.grade < 5.5 || result.grade === '-' || result.grade === 'GR') {
            indicator = "<span class=\"failed\"></span>";
          }

          var template = "\n                ".concat(indicator, "\n                <p>").concat(result._links.course.title, "</p>\n                <p>").concat(result.grade, "</p>\n                <p>").concat(result.fullDate, "</p>\n                ");
          div.innerHTML = template;

          _this3.resultsContainer.append(div);
        });
      } // Helpers

    }, {
      key: "getData",
      value: function getData() {
        var options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch('/studyprogress', options).then(function (res) {
          return res.json();
        });
      }
    }]);

    return StudyProgress;
  }( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

  customElements.define('study-progress', StudyProgress);
}

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WC_urgentAnnouncement = void 0;

var utils = _interopRequireDefault(require("../modules/utils.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var template = document.createElement('template');
exports.WC_urgentAnnouncement = template;
template.innerHTML = "\n<style>\n    div {\n        display: grid;\n        grid-template-columns: 1fr 50px;\n        grid-template-rows: 50px;\n        align-items: center;\n        background-color: #ECE7FA;\n    }\n    div.hide {\n        position: absolute;\n        left: -9999px;\n    }\n    p {\n        margin: 0;\n        padding-left: 30px;\n        color: black;\n        justify-self: start;\n    }\n    @media only screen and (max-width: 425px) {\n        p {\n            padding-left: 10px;\n        }\n    }\n    img {\n        padding-right: 20px;\n        grid-column: 2 / 3;\n        justify-self: end;\n        cursor: pointer;\n    }\n</style>\n<div class=\"hide\">\n    <p></p>\n    <img src=\"./media/icons/notification-exit.svg\" alt=\"hide notification\">\n</div>";

var urgentAnnouncement = /*#__PURE__*/function (_HTMLElement) {
  _inherits(urgentAnnouncement, _HTMLElement);

  var _super = _createSuper(urgentAnnouncement);

  function urgentAnnouncement() {
    var _this;

    _classCallCheck(this, urgentAnnouncement);

    _this = _super.call(this);

    _this.attachShadow({
      mode: 'open'
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.shadowRoot.querySelector('p').textContent = _this.getAttribute('message');

    _this.shadowRoot.querySelector('img').addEventListener('click', function () {
      _this.hide();

      _this.store();
    });

    return _this;
  }

  _createClass(urgentAnnouncement, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue != newValue && newValue != "") {
        var uid = this.getAttribute('uid');
        var storedHistory = utils.getLocalStorage('read-history');

        if (storedHistory) {
          if (!storedHistory.includes(uid)) {
            this.updateContent();
            this.show();
          }
        } else {
          this.updateContent();
          this.show();
        }
      }
    }
  }, {
    key: "updateContent",
    value: function updateContent() {
      this.shadowRoot.querySelector('p').textContent = this.getAttribute('message');
    }
  }, {
    key: "show",
    value: function show() {
      this.shadowRoot.querySelector('div').classList.remove('hide');
      document.querySelector('main').classList.add('showsNotification');
    }
  }, {
    key: "hide",
    value: function hide() {
      this.shadowRoot.querySelector('div').classList.add('hide');
      document.querySelector('main').classList.remove('showsNotification');
    }
  }, {
    key: "store",
    value: function store() {
      if (utils.storageAvailable('localStorage')) {
        var storedHistory = utils.getLocalStorage('read-history');
        var readHistory = storedHistory ? storedHistory : [];
        readHistory.push(this.getAttribute('uid'));
        utils.setLocalStorage('read-history', readHistory);
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['uid'];
    }
  }]);

  return urgentAnnouncement;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define('urgent-announcement', urgentAnnouncement);

},{"../modules/utils.mjs":4}]},{},[1])

//# sourceMappingURL=index.js.map
