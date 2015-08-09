var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/clean.js': {
      path: 'test/clean.js',
      buffer: helper.getFileBuffer('test/clean.js'),
      hash: helper.getFileHash('test/clean.js'),
      requires: [{
        path: 'test/clean.js',
        hash: helper.getFileHash('test/clean.js')
      }],
      links: [],
      globs: []
    },
    'test/warning.js': {
      path: 'test/warning.js',
      buffer: helper.getFileBuffer('test/warning.js'),
      hash: helper.getFileHash('test/warning.js'),
      requires: [{
        path: 'test/warning.js',
        hash: helper.getFileHash('test/warning.js')
      }],
      links: [],
      globs: []
    },
    'test/ignore.js': {
      path: 'test/ignore.js',
      buffer: helper.getFileBuffer('test/ignore.js'),
      hash: helper.getFileHash('test/ignore.js'),
      requires: [{
        path: 'test/ignore.js',
        hash: helper.getFileHash('test/ignore.js')
      }],
      links: [],
      globs: []
    },
    'test/error.js': Error,
    'test/error2.js': Error
  },
  'test/error3/config.json': {
    'test/error3/error.js': Error
  }
});
