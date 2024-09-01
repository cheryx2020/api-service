export default {
  input: './index.js',
  output: {
    file: 'dist/index.js', // Output file
    format: 'umd', // Output format
    name: 'APIService', // Global variable name for UMD build
    globals: {
      axios: 'axios', // If axios is an external dependency
    },
  },
  external: ['axios'], // Mark axios as an external dependency
};