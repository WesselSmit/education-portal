(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = _interopRequireWildcard(require("./modules/utils.mjs"));

var search = _interopRequireWildcard(require("./modules/search.mjs"));

var _schedule = _interopRequireDefault(require("./modules/schedule.mjs"));

var _urgentAnnouncement = _interopRequireDefault(require("./web-components/urgent-announcement.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var page = document.querySelector('main').id.toLowerCase(); //init web-components

var template = _urgentAnnouncement["default"]; //init dashboard

(0, _schedule["default"])(); //urgent announcements

var socket = io(); //subscribe to urgent-announcements

socket.emit('join', page); //on urgent-announcement hook update interface (see WC_urgentAnnouncement)

socket.on('urgent-announcement', function (announcement) {
  var urgentAnnouncement = document.querySelector('urgent-announcement');

  if (utils.exists([urgentAnnouncement])) {
    urgentAnnouncement.setAttribute('message', announcement.title);
    urgentAnnouncement.setAttribute('uid', announcement.newsItemId);
  }
}); //menu 

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

},{"./modules/schedule.mjs":2,"./modules/search.mjs":3,"./modules/utils.mjs":4,"./web-components/urgent-announcement.mjs":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = scheduleHandler;
var scheduleMaster = document.querySelector('#schedule');
var scheduleContainer = scheduleMaster.querySelector('#schedules-container');
var dateElement = scheduleMaster.querySelector('#navigator span');
var previousSchedule = scheduleMaster.querySelector('#navigator img:first-of-type');
var nextSchedule = scheduleMaster.querySelector('#navigator img:last-of-type');

function scheduleHandler() {
  var scheduleIndex = 0;
  arrowHandler(scheduleIndex);
  previousSchedule.addEventListener('click', function () {
    scheduleIndex--;
    arrowHandler(scheduleIndex);
    renderSchedules(scheduleIndex);
  });
  nextSchedule.addEventListener('click', function () {
    scheduleIndex++;
    arrowHandler(scheduleIndex);
    renderSchedules(scheduleIndex);
  });
} // Helpers


function renderSchedules(scheduleIndex) {
  getSchedules().then(function (schedules) {
    var schedule = schedules[scheduleIndex];
    var divs = schedule.schedules.map(function (schedule) {
      return createScheduleItem(schedule);
    });
    dateElement.textContent = "".concat(schedule.day, "-").concat(schedule.month, "-").concat(schedule.year);
    scheduleContainer.textContent = '';
    divs.forEach(function (div) {
      return scheduleContainer.append(div);
    });
  });
}

function arrowHandler(index) {
  index === 0 ? previousSchedule.classList.add('disabled') : previousSchedule.classList.remove('disabled');
  index === 4 ? nextSchedule.classList.add('disabled') : nextSchedule.classList.remove('disabled');
}

function createScheduleItem(schedule) {
  var schedule_time = "".concat(schedule.startDateTime.time, " - ").concat(schedule.endDateTime.time);
  var schedule_coursename = schedule._links.courses[0].title;
  var schedule_teacher = schedule._links.lecturers[0].title;
  var schedule_room;
  schedule._embedded ? schedule_room = schedule._embedded.rooms[0].abbreviation : schedule_room = 'No room';
  var div = document.createElement('div');
  var time = document.createElement('p');
  var coursename = document.createElement('p');
  var room = document.createElement('p');
  var teacher = document.createElement('p');
  time.textContent = schedule_time;
  coursename.textContent = schedule_coursename;
  room.textContent = schedule_room;
  teacher.textContent = schedule_teacher;
  div.append(time);
  div.append(coursename);
  div.append(room);
  div.append(teacher);
  div.classList.add('schedule-course');
  return div;
}

var options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}; // Data

function getSchedules() {
  return fetch('/schedule', options).then(function (res) {
    return res.json();
  });
}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
