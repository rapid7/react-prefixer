var el,
    camelRe = /-([a-z]|[0-9])/ig,
    support,
    camel;

export default function(prop, value){
	if (!el) {
		el  = document.createElement("div");
	}
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
    camel = prop.replace(camelRe, function(all, letter) {
        return (letter + "").toUpperCase();
    });

    // Check if the property is supported
    support = (camel in el.style);

    // Assign the property and value to invoke
    // the CSS interpreter
    el.style.cssText = prop + ":" + value;

    // Ensure both the property and value are
    // supported and return
    return support && (el.style[camel] !== "");
}