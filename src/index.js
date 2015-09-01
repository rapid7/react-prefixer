import prefix from "./prefix";
import properties from "./properties";

var div = document.createElement("div");

function isPropertySupported(prop, value, defaultValue) {
    let temp = div.cloneNode();

    temp.style[prop] = defaultValue;

    try {
        temp.style[prop] = value;
    } catch(e) {}

    return temp.style[prop] === value;
}

function applyPrefixes(obj) {
    Object.keys(obj).forEach(function(key) {
        if (typeof obj[key] === "object" && !!obj[key]) {
            obj[key] = applyPrefixes(obj[key]);
        } else if (properties.indexOf(key) !== -1 && (typeof div.style[key] !== "string")) {
            let value = obj[key],
                prefixedKey = prefix.js + key.charAt(0).toUpperCase() + key.slice(1);

            if (key === "transition") {
                value = value.replace(/transform/g, prefix.css + "transform");
            }

            delete obj[key];
            obj[prefixedKey] = value;
        } else if(key === "display" && obj[key] === "flex" && !isPropertySupported("display", "flex", "block")) {
            obj[key] = (prefix === "ms" ? "-ms-flexbox" : prefix.css + "flex");
        }
    });

    return obj;
}

export default applyPrefixes;