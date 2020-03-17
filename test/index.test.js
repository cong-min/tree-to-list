const treeToList = require('../dist/treeToList')

test('flatten array tree', () => {
    const arrayTree = [{
        name: 'name1',
        children: [{
            name: 'name3',
            children: [{
                name: 'name5'
            }]
        }, {
            name: 'name4'
        }]
    }, {
        name: 'name2'
    }];

    const list = treeToList(arrayTree);

    expect(list).toEqual([
        { name: 'name1' },
        { name: 'name3' },
        { name: 'name5' },
        { name: 'name4' },
        { name: 'name2' }
    ]);
});

test('flatten object tree', () => {
    const objectTree = {
        node1: {
            name: 'name1',
            tree: {
                node3: {
                    name: 'name3',
                    tree: {
                        node5: { name: 'name5' }
                    }
                },
                node4: { name: 'name4' },
            }
        },
        node2: { name: 'name2' }
    };

    const list = treeToList(objectTree, 'tree');

    expect(list).toEqual({
        node1: { name: 'name1' },
        node3: { name: 'name3' },
        node5: { name: 'name5' },
        node4: { name: 'name4' },
        node2: { name: 'name2' }
    });
});

test('flatten invalid tree', () => {
    const invalidTree = 'tree';

    const list = treeToList(invalidTree);

    expect(list).toEqual([]);
});
