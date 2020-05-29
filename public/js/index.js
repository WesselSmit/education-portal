(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var utils = _interopRequireWildcard(require("./modules/utils.mjs"));

var search = _interopRequireWildcard(require("./modules/search.mjs"));

var _schedule = _interopRequireDefault(require("./modules/schedule.mjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Dashboard interaction with Timetable
(0, _schedule["default"])(); //menu 

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

},{"./modules/schedule.mjs":2,"./modules/search.mjs":3,"./modules/utils.mjs":4}],2:[function(require,module,exports){
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

},{}]},{},[1])

//# sourceMappingURL=index.js.map
