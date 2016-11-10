# react-prefixer

react-prefixer is a tiny package designed to provide vender-specific prefixes to the style objects you use in your React project.

#### Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Test environments](#test-environments)
* [Browser support](#browser-support)
* [Development](#development)

#### Installation

```
$ npm install react-prefixer
```

#### Usage

```javascript
import prefix from 'react-prefixer';

const styles = prefix({
  userSelect: 'none'
});
    
console.log(styles); // {WebkitUserSelect:"none"}
```

It also works on deeply-nested objects:

```javascript
import prefix from 'react-prefixer';

const styles = prefix({
  some:{
    really:{
      deep:{
        style:{
          userSelect: 'none'
        }
      }
    }
  }
});
    
console.log(styles); // {some:{really:{deep:{style:{WebkitUserSelect:"none"}}}}}
```

And will appropriately modify your values for legacy syntaxes on transition:

```javascript
import prefix from 'react-prefixer';

const styles = prefix({
  transition: 'transform 200ms'
});
    
console.log(styles); // {WebkitTransition:"-webkit-transform 200ms"}, if on Safari for example
```

It will also do the tweener or most recent vendor syntax for flexbox:

```javascript
import prefix from 'react-prefixer';

const styles = prefix({
  display: 'flex'
});
    
console.log(styles); 
// {display: '-webkit-flex'}, if on Safari
// {display: '-ms-flexbox'}, if on IE10
```

#### Test environments

When running in test environments where there is a JS-based DOM (`jsdom` for example), the `getComputedStyle` method will return an empty array of styles when calculating the prefix. This previously caused an error which is since resolved, however it will default to assuming no browser prefix at all. As such, if you want to perform tests based on a specific browser prefix, you will need to mock the `getComputedStyle` property on the `window`. An example that is for tests with Webkit browsers:

```javascript
const originalGetComputedStyle = window.getComputedStyle;

window.getComputedStyle = function(...args) {
  if (arguments[0] === document.documentElement) {
    return ['-webkit-appearance'];
  }

  return originalGetComputedStyle.apply(window, args);
};
```

#### Browser support

* IE10+ and Edge
* Firefox
* Chrome
* Safari
* Opera

#### Development

Standard stuff, clone the repo and `npm i` to get the dependencies. npm scripts available:
* `build` => runs webpack to build the compiled JS file with `NODE_ENV` set to `development`
* `build:minified` => runs webpack to build the compiled and optimized JS file with `NODE_ENV` set to `production`
* `clean` => runs `rimraf` on both `lib` and `dist` directories
* `dev` => runs the webpack dev server for the playground
* `lint` => runs ESLint against files in the `src` folder
* `lint:fix` => runs `lint` with `--fix` applied
* `prepublish` => if in publish, runs `prepublish:compile`
* `prepublish:compile` => runs `clean`, `lint`, `test`, `transpile`, `build` and `build:minified`
* `test` => runs `ava` against all files in `src`
* `test:watch` => runs `test` with a persistent watcher
* `transpile` => runs Babel against files in `src` to files in `lib`

Happy prefixing!
