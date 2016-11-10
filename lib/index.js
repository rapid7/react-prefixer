'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

var _prefix = require('./prefix');

var _prefix2 = _interopRequireDefault(_prefix);

var _supports = require('./supports');

var _supports2 = _interopRequireDefault(_supports);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * create a new style object with prefixes applied
 *
 * @param {Object} object
 * @returns {Object}
 */
var applyPrefixes = function applyPrefixes(object) {
  if (!(0, _isPlainObject2.default)(object)) {
    return object;
  }

  var value = void 0;

  return Object.keys(object).reduce(function (styleObject, originalKey) {
    var key = originalKey;

    value = object[key];

    if ((0, _isPlainObject2.default)(value)) {
      return _extends({}, styleObject, _defineProperty({}, key, applyPrefixes(value)));
    }

    if (_constants.CSS_PROPERTIES.indexOf(key) !== -1 && !(0, _supports2.default)((0, _kebabCase2.default)(key))) {
      key = '' + _prefix2.default.js + key.charAt(0).toUpperCase() + key.slice(1);
    }

    if (originalKey === 'display' && object[originalKey] === 'flex' && !(0, _supports2.default)('display', 'flex')) {
      return _extends({}, styleObject, _defineProperty({}, key, _prefix2.default === 'ms' ? '-ms-flexbox' : _prefix2.default.css + 'flex'));
    }

    if (key === 'transition') {
      var _ret = function () {
        var animatableValuesObject = {};

        _constants.ANIMATABLE_VALUES.forEach(function (animatableValue) {
          var kebabValue = (0, _kebabCase2.default)(animatableValue);

          if (!(0, _supports2.default)(kebabValue)) {
            var re = new RegExp(kebabValue, 'g');

            animatableValuesObject[key] = object[key].replace(re, '' + _prefix2.default.css + kebabValue);
          }
        });

        return {
          v: _extends({}, styleObject, animatableValuesObject)
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return _extends({}, styleObject, _defineProperty({}, key, value));
  }, {});
};

exports.default = applyPrefixes;
module.exports = exports['default'];