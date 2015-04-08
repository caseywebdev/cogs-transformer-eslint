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
    'test/error.js': Error,
    'test/error2.js': Error
  }
});
