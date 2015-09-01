var styles = window.getComputedStyle(document.documentElement, ""),
    prefix = Array
        .prototype
        .slice
        .call(styles)
        .join("")
        .match(/-(moz|webkit|ms)-/)[1] || (styles.OLink === "" && ["", "o"]),
    ret = {
        css:"-" + prefix + "-",
        js:prefix
    };

if (ret.js !== "ms") {
    ret.js = ret.js.charAt(0).toUpperCase() + ret.js.slice(1);
}

export default ret;