import prefix from "./prefix";
import properties from "./properties";

var div = document.createElement("div");

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
        Object.keys(obj).forEach(function (key) {
            if (typeof obj[key] === "object" && !!obj[key]) {
                obj[key] = applyPrefixes(obj[key]);
            } else if (properties.indexOf(key) !== -1 && !isPropertySupported(key)) {
                let value = obj[key],
                    prefixedKey = prefix.js + key.charAt(0).toUpperCase() + key.slice(1);

                if (key === "transition") {
                    value = value.replace(/transform/g, prefix.css + "transform");
                }

                delete obj[key];
                obj[prefixedKey] = value;
            } else if (key === "display" && obj[key] === "flex" && !isValueSupported("display", "flex", "block")) {
                obj[key] = (prefix === "ms" ? "-ms-flexbox" : prefix.css + "flex");
            }
        });
    }

    return obj;
}

export default applyPrefixes;