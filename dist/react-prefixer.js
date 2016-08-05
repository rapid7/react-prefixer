(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["react-prefixer"] = factory();
	else
		root["react-prefixer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _prefix = __webpack_require__(1);

	var _prefix2 = _interopRequireDefault(_prefix);

	var _properties = __webpack_require__(2);

	var _properties2 = _interopRequireDefault(_properties);

	var _animatableValues = __webpack_require__(3);

	var _animatableValues2 = _interopRequireDefault(_animatableValues);

	var _CssSupportsPolyfill = __webpack_require__(4);

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
	                obj[realKey] = _prefix2["default"] === "ms" ? "-ms-flexbox" : _prefix2["default"].css + "flex";
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var ret = {
		css: '',
		js: ''
	};

	if (typeof window !== 'undefined') {
		var styles = window.getComputedStyle(document.documentElement, ""),
		    prefix = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/)[1] || styles.OLink === "" && ["", "o"],
		    ret = {
			css: "-" + prefix + "-",
			js: prefix
		};

		if (ret.js !== "ms") {
			ret.js = ret.js.charAt(0).toUpperCase() + ret.js.slice(1);
		}
	}

	exports['default'] = ret;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = ["alignContent", "alignItems", "alignSelf", "animation", "animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction", "appearance", "aspectRatio", "backfaceVisibility", "backgroundClip", "borderImage", "borderImageSlice", "boxShadow", "columnCount", "columnFill", "columnGap", "columnRule", "columnRuleColor", "columnRuleStyle", "columnRuleWidth", "columnSpan", "columnWidth", "columns", "flex", "flexBasis", "flexDirection", "flexFlow", "flexGrow", "flexShrink", "flexWrap", "fontFeatureSettings", "fontKearning", "fontVariantLigatures", "justifyContent", "grid", "gridArea", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridColumn", "gridColumnEnd", "gridColumnStart", "gridRow", "gridRowEnd", "gridRowStart", "gridTemplate", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows", "hyphens", "lineBreak", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "rubyPosition", "scrollSnapCoordinate", "scrollSnapDestination", "scrollSnapPoints", "scrollSnapPointsX", "scrollSnapPointsY", "scrollSnapType", "tabSize", "textDecoration", "textDecorationColor", "textDecorationLine", "textDecorationStyle", "textOrientation", "textSizeAdjust", "transform", "transition", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle", "transitionProperty", "transitionDuration", "transitionTimingFunction", "transitionDelay", "userModify", "userSelect"];
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = ["columnCount", "columnGap", "columnRule", "columnRuleColor", "columnRuleWidth", "columns", "flex", "flexBasis", "flexGrow", "flexShrink", "order", "perspective", "perspectiveOrigin", "perspectiveOriginX", "perspectiveOriginY", "scrollSnapCoordinate", "scrollSnapDirection", "textDecoration", "textDecorationColor", "transform", "transformOrigin", "transformOriginX", "transformOriginY", "transformOriginZ", "transformStyle"];
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var el = document.createElement("div"),
	    camelRe = /-([a-z]|[0-9])/ig,
	    support,
	    camel;

	exports["default"] = function (prop, value) {
	    // If no value is supplied, use "inherit"
	    value = arguments.length === 2 ? value : "inherit";

	    // Try the native standard method first
	    if ("CSS" in window && "supports" in window.CSS) {
	        return window.CSS.supports(prop, value);
	    }

	    // Check Opera's native method
	    if ("supportsCSS" in window) {
	        return window.supportsCSS(prop, value);
	    }

	    // Convert to camel-case for DOM interactions
	    camel = prop.replace(camelRe, function (all, letter) {
	        return (letter + "").toUpperCase();
	    });

	    // Check if the property is supported
	    support = camel in el.style;

	    // Assign the property and value to invoke
	    // the CSS interpreter
	    el.style.cssText = prop + ":" + value;

	    // Ensure both the property and value are
	    // supported and return
	    return support && el.style[camel] !== "";
	};

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;