"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _prefix = require("./prefix");

var _prefix2 = _interopRequireDefault(_prefix);

var _properties = require("./properties");

var _properties2 = _interopRequireDefault(_properties);

var _animatableValues = require("./animatableValues");

var _animatableValues2 = _interopRequireDefault(_animatableValues);

var _CssSupportsPolyfill = require("./CssSupportsPolyfill");

var _CssSupportsPolyfill2 = _interopRequireDefault(_CssSupportsPolyfill);

function camelToKebab(str) {
    return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

function applyPrefixes(obj) {
    if (typeof obj === "object" && !!obj) {
        Object.keys(obj).forEach(function (key) {
            var realKey = key;

            if (typeof obj[key] === "object" && !!obj[key]) {
                obj[key] = applyPrefixes(obj[key]);
            } else if (_properties2["default"].indexOf(key) !== -1 && !(0, _CssSupportsPolyfill2["default"])(camelToKebab(key))) {
                var value = obj[key];

                realKey = _prefix2["default"].js + key.charAt(0).toUpperCase() + key.slice(1);

                delete obj[key];
                obj[realKey] = value;
            }

            if (realKey === "display" && obj[realKey] === "flex" && !(0, _CssSupportsPolyfill2["default"])("display", "flex")) {
                obj[realKey] = _prefix2["default"].js === "ms" ? "-ms-flexbox" : _prefix2["default"].css + "flex";
            }

            if (key === "transition") {
                _animatableValues2["default"].forEach(function (animatableValue) {
                    var kebabValue = camelToKebab(animatableValue);

                    if (!(0, _CssSupportsPolyfill2["default"])(kebabValue)) {
                        var re = new RegExp(kebabValue, "g");

                        obj[realKey] = obj[realKey].replace(re, _prefix2["default"].css + kebabValue);
                    }
                });
            }
        });
    }

    return obj;
}

exports["default"] = applyPrefixes;
module.exports = exports["default"];