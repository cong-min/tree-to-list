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
function treeToList(tree, key = 'children') {
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
function arrayTreeToList(tree, key = 'children') {
    return tree.reduce((list, node) => {
        const item = { ...node };
        const subTree = item[key];
        delete item[key];

        if (node) list.push(item);

        const subList = treeToList(subTree, key);
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
function objectTreeToList(tree, key = 'children') {
    return Object.keys(tree).reduce((list, nodeKey) => {
        const item = { ...tree[nodeKey] };
        const subTree = item[key];
        delete item[key];

        list[nodeKey] = {
            ...list[nodeKey],
            ...item
        };

        const subList = treeToList(subTree, key);
        return Object.assign(list, subList);
    }, {});
}

export default treeToList;
