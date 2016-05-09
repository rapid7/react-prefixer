import prefix from "./prefix";
import properties from "./properties";
import animatableValues from "./animatableValues";
import supports from "./CssSupportsPolyfill";

function camelToKebab(str) {
    return str.replace(/\W+/g, "-").replace(/([a-z\d])([A-Z])/g, "$1-$2").toLowerCase();
}

function applyPrefixes(obj) {
    if (typeof obj === "object" && !!obj) {
        Object.keys(obj).forEach(function(key) {
            let realKey = key;

            if (typeof obj[key] === "object" && !!obj[key]) {
                obj[key] = applyPrefixes(obj[key]);
            } else if (properties.indexOf(key) !== -1 && !supports(camelToKebab(key))) {
                let value = obj[key];

                realKey = prefix.js + key.charAt(0).toUpperCase() + key.slice(1);

                delete obj[key];
                obj[realKey] = value;
            }

            if (realKey === "display" && obj[realKey] === "flex" && !supports("display", "flex")) {
                obj[realKey] = (prefix.js === "ms" ? "-ms-flexbox" : prefix.css + "flex");
            }

            if (key === "transition") {
                animatableValues.forEach(function(animatableValue) {
                    let kebabValue = camelToKebab(animatableValue);

                    if (!supports(kebabValue)) {
                            let re = new RegExp(kebabValue, "g");

                        obj[realKey] = obj[realKey].replace(re, prefix.css + kebabValue);
                    }
                });
            }
        });
    }

    return obj;
}

export default applyPrefixes;
