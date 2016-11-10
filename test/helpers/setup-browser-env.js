const jsdom = require('jsdom');
const jsdomGlobal = require('jsdom-global');

const doc = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
const win = doc.defaultView;
const nav = win.navigator;

global.document = doc;
global.window = win;
global.navigator = nav;

jsdomGlobal();

const originalGetComputedStyle = window.getComputedStyle;

window.getComputedStyle = function(...args) {
  if (arguments[0] === document.documentElement) {
    return ['-webkit-appearance'];
  }

  return originalGetComputedStyle.apply(window, args);
};
