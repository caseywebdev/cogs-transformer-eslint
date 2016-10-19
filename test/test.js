var helper = require('cogs-test-helper');

helper.run({
  'test/config.json': {
    'test/clean.js': helper.getFileBuffer('test/clean.js'),
    'test/warning.js': helper.getFileBuffer('test/warning.js'),
    'test/ignore.js': helper.getFileBuffer('test/ignore.js'),
    'test/error.js': Error,
    'test/error2.js': Error
  },
  'test/error3/config.json': {
    'test/error3/error.js': Error
  }
});
