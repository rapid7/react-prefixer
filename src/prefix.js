const STYLES = window.getComputedStyle(document.documentElement);

const PREFIX_STRING = Array.prototype.slice.call(STYLES).join('');
const STANDARD_PREFIX_MATCH = PREFIX_STRING.match(/-(moz|webkit|ms)-/);
const OPERA_PREFIX_MATCH = PREFIX_STRING.match(STYLES.OLink === '' && ['', 'o']);
const PREFIX_MATCH = STANDARD_PREFIX_MATCH || OPERA_PREFIX_MATCH;

const PREFIX = PREFIX_MATCH ? PREFIX_MATCH[1] : '';

let prefixObject = {
  css: `${PREFIX}`,
  js: PREFIX
};

if (prefixObject.js !== 'ms') {
  prefixObject = {
    ...prefixObject,
    js: `${prefixObject.js.charAt(0).toUpperCase()}${prefixObject.js.slice(1)}`
  };
}

export default prefixObject;
