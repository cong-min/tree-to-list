/** tree-to-list v3.0.0
 * - https://www.npmjs.com/package/tree-to-list
 * - https://github.com/mcc108/tree-to-list
 */

/**
 * transform tree to stack
 *
 * @param {Array|Object} tree Tree.
 */
function transformStack(tree) {
    var stack = [];
    if (Array.isArray(tree)) { // array tree
        stack = tree.map(function (node) { return ({
            value: node
        }); });
    }
    else if (Object.prototype.toString.call(tree) === '[object Object]') { // object tree
        stack = Object.keys(tree).map(function (key) {
            var node = tree[key];
            return ({
                key: key,
                value: node
            });
        });
    }
    return stack;
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
var treeToList = function (tree, key) {
    if (key === void 0) { key = 'children'; }
    var list;
    if (Array.isArray(tree)) { // array tree
        list = [];
    }
    else if (Object.prototype.toString.call(tree) === '[object Object]') { // object tree
        list = {};
    }
    else { // invalid tree
        list = [];
        return list;
    }
    var stack = transformStack(tree);
    var _loop_1 = function () {
        var curStack = stack.shift();
        // eslint-disable-next-line no-continue
        if (!curStack || !curStack.value)
            return "continue"; // invalid node
        var nodeKey = curStack.key, node = curStack.value;
        var item = (nodeKey ? list[nodeKey] : {}) || {};
        Object.keys(node).forEach(function (prop) {
            if (prop !== key) {
                item[prop] = node[prop];
            }
        });
        if (nodeKey) { // object
            list[nodeKey] = item;
        }
        else { // array
            list.push(item);
        }
        var subTree = node[key] || [];
        stack = transformStack(subTree).concat(stack);
    };
    while (stack.length) {
        _loop_1();
    }
    return list;
};

export { treeToList as default };
