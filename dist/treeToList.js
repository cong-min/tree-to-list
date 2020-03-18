/** tree-to-list v1.0.1
 * - https://www.npmjs.com/package/tree-to-list
 * - https://github.com/mcc108/tree-to-list
 */

'use strict';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/** tree-to-list
 * flatten tree to list
 *
 * @param {Array|Object} tree Tree.
 * @param {String} key Node key.
 * @returns {Array|Object} Returns flattened list.
 * @example
 *
 * // 1. flatten array tree
 * tree = [{
 *   name: 'name1',
 *   children: [{
 *     name: 'name3',
 *     children: [{
 *       name: 'name5'
 *     }]
 *   }, {
 *     name: 'name4'
 *   }]
 * }, {
 *   name: 'name2'
 * }]
 *
 * treeToList(tree, 'children')
 * // =>
 * [
 *   { name: 'name1' },
 *   { name: 'name3' },
 *   { name: 'name5' },
 *   { name: 'name4' },
 *   { name: 'name2' }
 * ]
 *
 * // 2. flatten object tree
 * tree = {
 *   node1: {
 *     name: 'name1',
 *     tree: {
 *       node3: {
 *         name: 'name3',
 *         tree: {
 *           node2: {
 *             name: 'name5',
 *             key5: 'value5'
 *           }
 *         }
 *       },
 *       node4: { name: 'name4' },
 *     }
 *   },
 *   node2: {
 *     name: 'name2',
 *     key2: 'value2'
 *   }
 * }
 *
 * treeToList(tree, 'tree')
 * // =>
 * {
 *   node1: { name: 'name1' },
 *   node3: { name: 'name3' },
 *   node4: { name: 'name4' },
 *   node2: {
 *     name: 'name2',
 *     key5: 'value5',
 *     key2: 'value2'
 *   }
 * }
 *
 */
function treeToList(tree) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';

  if (Array.isArray(tree)) {
    // array tree
    return arrayTreeToList(tree, key);
  } else if (Object.prototype.toString.call(tree) === '[object Object]') {
    // object tree
    return objectTreeToList(tree, key);
  } else {
    // invalid tree
    return [];
  }
}
/**
 * flatten array tree
 *
 * @param {Array} tree Array tree.
 * @param {String} key Node key.
 * @returns {Array} Returns flattened array list.
 * */


function arrayTreeToList(tree) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  return tree.reduce(function (list, node) {
    var item = _objectSpread2({}, node);

    var subTree = item[key];
    delete item[key];
    if (node) list.push(item);
    var subList = treeToList(subTree, key);
    return list.concat(subList);
  }, []);
}
/**
 * flatten object tree
 *
 * @param {Object} tree Object tree.
 * @param {String} key Node key.
 * @returns {Object} Returns flattened object list.
 * */


function objectTreeToList(tree) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
  return Object.keys(tree).reduce(function (list, nodeKey) {
    var item = _objectSpread2({}, tree[nodeKey]);

    var subTree = item[key];
    delete item[key];
    list[nodeKey] = _objectSpread2({}, list[nodeKey], {}, item);
    var subList = treeToList(subTree, key);
    return _extends(list, subList);
  }, {});
}

module.exports = treeToList;
