// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import merge from 'lodash/merge';

const { version } = require('./package.json');

const banner = `/** tree-to-list v${version}\n`
    + ' * - https://www.npmjs.com/package/tree-to-list\n'
    + ' * - https://github.com/mcc108/tree-to-list\n'
    + ' */\n';

export default [{
  output: {
    file: 'dist/treeToList.js',
    format: 'cjs',
  },
}, {
  output: {
    file: 'dist/treeToList.esm.js',
    format: 'esm',
  },
}].map((config) => merge({
  input: 'src/index.ts',
  output: {
    file: 'dist/treeToList.js',
    name: 'treeToList',
    banner,
    exports: 'default',
  },
  plugins: [
    typescript(),
    resolve(),
    babel(),
    commonjs(),
  ],
}, config));
