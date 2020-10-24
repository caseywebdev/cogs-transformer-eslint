import helper from 'cogs-test-helper';

export default helper.createTests({
  'test/config.js': {
    'test/clean.js': helper.getFileBuffer('test/clean.js'),
    'test/warning.js': helper.getFileBuffer('test/warning.js'),
    'test/ignore.js': helper.getFileBuffer('test/ignore.js'),
    'test/error.js': Error,
    'test/error2.js': Error
  },
  'test/error3/config.js': {
    'test/error3/error.js': Error
  }
});
