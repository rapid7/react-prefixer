import isPlainObject from 'lodash/isPlainObject';
import kebabCase from 'lodash/kebabCase';

import prefix from './prefix';
import isSupported from './supports';

import {
  ANIMATABLE_VALUES,
  CSS_PROPERTIES
} from './constants';

/**
 * create a new style object with prefixes applied
 *
 * @param {Object} object
 * @returns {Object}
 */
const applyPrefixes = (object) => {
  if (!isPlainObject(object)) {
    return object;
  }

  let value;

  return Object.keys(object).reduce((styleObject, originalKey) => {
    let key = originalKey;

    value = object[key];

    if (isPlainObject(value)) {
      return {
        ...styleObject,
        [key]: applyPrefixes(value)
      };
    }

    if (CSS_PROPERTIES.indexOf(key) !== -1 && !isSupported(kebabCase(key))) {
      key = `${prefix.js}${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    }

    if (originalKey === 'display' && object[originalKey] === 'flex' && !isSupported('display', 'flex')) {
      return {
        ...styleObject,
        [key]: (prefix === 'ms' ? '-ms-flexbox' : `${prefix.css}flex`)
      };
    }

    if (key === 'transition') {
      let animatableValuesObject = {};

      ANIMATABLE_VALUES.forEach((animatableValue) => {
        let kebabValue = kebabCase(animatableValue);

        if (!isSupported(kebabValue)) {
          let re = new RegExp(kebabValue, 'g');

          animatableValuesObject[key] = object[key].replace(re, `${prefix.css}${kebabValue}`);
        }
      });

      return {
        ...styleObject,
        ...animatableValuesObject
      };
    }

    return {
      ...styleObject,
      [key]: value
    };
  }, {});
};

export default applyPrefixes;
