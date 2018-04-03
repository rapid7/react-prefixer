'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * is the property supported, or is the value supported for the given property
 * 
 * @param {string} property
 * @param {number|string} value
 * @returns {boolean}
 */
var isSupported = function isSupported(property, value) {
  // Try the native standard method first
  if ('CSS' in window && 'supports' in window.CSS) {
    return window.CSS.supports(property, value);
  }

  // Check Opera's native method
  if ('supportsCSS' in window) {
    return window.supportsCSS(property, value);
  }

  // Convert to camel-case for DOM interactions
  var camelCaseProperty = (0, _camelCase2.default)(property);

  // Check if the property is supported
  var element = document.createElement('div');
  var support = camelCaseProperty in element.style;

  // Assign the property and value to invoke the CSS interpreter
  element.style.cssText = property + ':' + value;

  // Ensure both the property and value are
  // supported and return
  return support && element.style[camelCaseProperty] !== '';
};

exports.default = isSupported;
module.exports = exports['default'];