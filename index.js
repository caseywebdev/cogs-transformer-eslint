var eslint = require('eslint');

module.exports = function (file, options, cb) {
  var cli = new eslint.CLIEngine(options);
  var ers = cli.executeOnFiles([file.path]).results[0].messages;
  for (var i = 0, l = ers.length; i < l; ++i) {
    var er = ers[i];
    if (!er.fatal && er.severity < 2) continue;
    return cb(new Error(
      file.path + ': ' + er.message + ' (' + (er.ruleId || 'fatal') + ')\n' +
      er.line + ': ' + er.source + '\n' +
      (new Array(er.column + er.line.toString().length + 2)).join('.') + '^'
    ));
  }
  cb(null, {});
};
