import prefix from "./prefix";
import properties from "./properties";
import animatableValues from "./animatableValues";

var div = document.createElement("div");

function camelToKebab(str) {
    return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

function isPropertySupported(prop) {
    return typeof div.style[prop] === "string";
}

function isValueSupported(prop, value, defaultValue) {
    div.style[prop] = defaultValue;

    try {
        div.style[prop] = value;
    } catch(e) {}

    return div.style[prop] === value;
}

function applyPrefixes(obj) {
    if (typeof obj === "object" && !!obj) {
        Object.keys(obj).forEach(function(key) {
            let realKey = key;

            if (typeof obj[key] === "object" && !!obj[key]) {
                obj[key] = applyPrefixes(obj[key]);
            } else if (properties.indexOf(key) !== -1 && !isPropertySupported(key)) {
                let value = obj[key];

                realKey = prefix.js + key.charAt(0).toUpperCase() + key.slice(1);

                delete obj[key];
                obj[realKey] = value;
            }

            if (key === "display" && obj[key] === "flex" && !isValueSupported("display", "flex", "block")) {
                obj[key] = (prefix === "ms" ? "-ms-flexbox" : prefix.css + "flex");
            }

            if (key === "transition") {
                animatableValues.forEach(function(animatableValue) {
                    if (!isPropertySupported(animatableValue)) {
                        var kebabValue = camelToKebab(animatableValue),
                            re = new RegExp(kebabValue, "g");

                        obj[realKey] = obj[realKey].replace(re, prefix.css + kebabValue);
                    }
                });
            }
        });
    }

    return obj;
}

export default applyPrefixes;