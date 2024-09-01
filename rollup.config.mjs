export default {
  input: './index.js',
  output: {
    file: 'dist/index.js', // Output file
    format: 'umd', // Output format
    name: 'APIService' // Global variable name for UMD build
  },
};