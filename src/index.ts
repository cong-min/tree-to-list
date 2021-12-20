interface TreeToList {
  (tree: Record<string, any>, key?: string): Record<string, any>;
  (tree: Record<string, any>[], key?: string): Record<string, any>[];
}

/**
 * transform tree to stack
 *
 * @param {Array|Object} tree Tree.
 */
function transformStack(tree: Record<string, any> | Record<string, any>[]) {
  let stack: {
    key?: string,
    value: any,
  }[] = [];

  if (Array.isArray(tree)) { // array tree
    stack = tree.map((node) => ({
      value: node,
    }));
  } else if (Object.prototype.toString.call(tree) === '[object Object]') { // object tree
    stack = Object.keys(tree).map((key) => {
      const node = tree[key];
      return ({
        key,
        value: node,
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
const treeToList: TreeToList = (tree, key = 'children') => {
  let list: any;

  if (Array.isArray(tree)) { // array tree
    list = [];
  } else if (Object.prototype.toString.call(tree) === '[object Object]') { // object tree
    list = {};
  } else { // invalid tree
    list = [];
    return list;
  }

  let stack = transformStack(tree);

  while (stack.length) {
    const curStack = stack.shift();
    // eslint-disable-next-line no-continue
    if (!curStack || !curStack.value) continue; // invalid node

    const { key: nodeKey, value: node } = curStack;

    const item = (nodeKey ? list[nodeKey] : {}) || {};
    Object.keys(node).forEach((prop) => {
      if (prop !== key) {
        item[prop] = node[prop];
      }
    });
    if (nodeKey) { // object
      list[nodeKey] = item;
    } else { // array
      list.push(item);
    }

    const subTree = node[key] || [];
    stack = transformStack(subTree).concat(stack);
  }

  return list;
};

export default treeToList;
