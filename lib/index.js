"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _prefix = require("./prefix");

var _prefix2 = _interopRequireDefault(_prefix);

var _properties = require("./properties");

var _properties2 = _interopRequireDefault(_properties);

var div = document.createElement("div");

function isPropertySupported(prop) {
    return typeof div.style[prop] === "string";
}

function isValueSupported(prop, value, defaultValue) {
    div.style[prop] = defaultValue;

    try {
        div.style[prop] = value;
    } catch (e) {}

    return div.style[prop] === value;
}

function applyPrefixes(obj) {
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === "object" && !!obj[key]) {
            obj[key] = applyPrefixes(obj[key]);
        } else if (_properties2["default"].indexOf(key) !== -1 && !isPropertySupported(key)) {
            var value = obj[key],
                prefixedKey = _prefix2["default"].js + key.charAt(0).toUpperCase() + key.slice(1);

            if (key === "transition") {
                value = value.replace(/transform/g, _prefix2["default"].css + "transform");
            }

            delete obj[key];
            obj[prefixedKey] = value;
        } else if (key === "display" && obj[key] === "flex" && !isValueSupported("display", "flex", "block")) {
            obj[key] = _prefix2["default"] === "ms" ? "-ms-flexbox" : _prefix2["default"].css + "flex";
        }
    });

    return obj;
}

exports["default"] = applyPrefixes;
module.exports = exports["default"];