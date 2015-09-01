"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var styles = window.getComputedStyle(document.documentElement, ""),
    prefix = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)[1] || styles.OLink === "" && ["", "o"],
    ret = {
    css: "-" + prefix + "-",
    js: prefix
};

if (ret.js !== "ms") {
    ret.js = ret.js.charAt(0).toUpperCase() + ret.js.slice(1);
}

exports["default"] = ret;
module.exports = exports["default"];