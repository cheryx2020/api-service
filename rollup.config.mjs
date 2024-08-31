export default {
  input: './index.js',
  output: [
    {
      dir: 'dist/esm',
      format: 'es',
      entryFileNames: '[name].mjs'
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      entryFileNames: '[name].cjs'
    }
  ]
};