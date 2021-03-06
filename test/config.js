export default {
  transformers: {
    name: 'index.js',
    options: {
      useEslintrc: false,
      envs: ['browser'],
      rules: {
        'no-unused-vars': 2,
        quotes: [1, 'single', 'avoid-escape']
      }
    }
  }
}
