/**
 * Copyright (c) 2015 - Igor Krimerman <i.m.krimerman@gmail.com>
 * MIT License
 */
;(function(root, forget) {
  'use strict';

  if (typeof module === 'object' && module.exports && typeof require === 'function')
    module.exports = forget(require('lodash'));
  else if (typeof define === 'function' && typeof define.amd === 'object')
    define(['lodash'], forget);
  else
    if (root._ && root._.mixin)
      root._.mixin({forget: forget(_.has)});
    else {
      console.warn('Lodash method `has` is not available. Nested syntax will be disabled. Switching to hasOwnProperty.');
      root.forget = forget(Object.prototype.hasOwnProperty);
    }

}(this, function(_) {
  'use strict';

  /**
   * Converts string to array path
   * @param {string} stringPath
   * @returns {Array}
   */
  function toPath (stringPath) {
    var keysArray = stringPath.split('.')
      , path = [];
    for (var i = 0; i < keysArray.length; i ++) {
      var value = keysArray[i]
        , openBr = value.indexOf('[')
        , closeBr = value.indexOf(']');
      if (~ openBr && ~ closeBr) {
        var arr = value.slice(0, openBr)
          , index = value.slice(openBr + 1, closeBr)
        path.push(arr);
        path.push(index);
      }
      else path.push(value);
    }
    return path;
  };

  /**
   * Removes property from object
   * @param {object} obj - Object to remove from
   * @param {string} prop - Property to remove
   * @returns {object}
   *
   * var forget = require('lodash.forget')
   *   , object = { 'a': { 'b': { 'c': 3, 'd': [1, 2] } } };
   *
   * forget(object, 'a.b.c');
   * // => { 'a': { 'b': { 'd': [1, 2] } } };
   *
   * forget(object, 'a.b.d[0]');
   * // => { 'a': { 'b': { 'd': [2] } } };
   *
   * forget(object, 'a');
   * // => {};
   *
   * Or use lodash mixin
   * _.mixin({ forget: forget });
   */
  return function forget (obj, prop) {
    if (! _.has(obj, prop)) return obj;
    if (! ~prop.indexOf('.') && (! ~prop.indexOf('[') && ! ~prop.indexOf(']')))
      delete obj[prop];
    else {
      var isArray = Array.isArray
        , path = toPath(prop)
        , pathLen = path.length
        , pathLastKey = path[pathLen - 1]
        , props = Array.prototype.slice.call(path, 0, -1)
        , propsLen = props.length
        , parent = obj

      for (var i = 0; i < propsLen; i ++) parent = parent[props[i]];
      if (isArray(parent)) parent.splice(pathLastKey, 1);
      else if (_.isObject(parent)) delete parent[pathLastKey];
    }
    return obj;
  };
}));
