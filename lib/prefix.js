'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var STYLES = window.getComputedStyle(document.documentElement);

var PREFIX_STRING = Array.prototype.slice.call(STYLES).join('');
var STANDARD_PREFIX_MATCH = PREFIX_STRING.match(/-(moz|webkit|ms)-/);
var OPERA_PREFIX_MATCH = PREFIX_STRING.match(STYLES.OLink === '' && ['', 'o']);
var PREFIX_MATCH = STANDARD_PREFIX_MATCH || OPERA_PREFIX_MATCH;

var PREFIX = PREFIX_MATCH ? PREFIX_MATCH[1] : '';

var prefixObject = {
  css: '-' + PREFIX + '-',
  js: PREFIX
};

if (prefixObject.js !== 'ms') {
  prefixObject = _extends({}, prefixObject, {
    js: '' + prefixObject.js.charAt(0).toUpperCase() + prefixObject.js.slice(1)
  });
}

exports.default = prefixObject;
module.exports = exports['default'];