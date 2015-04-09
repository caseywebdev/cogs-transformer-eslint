var eslint = require('eslint');

module.exports = function (file, options, cb) {
  var cli = new eslint.CLIEngine(options);
  if (cli.isPathIgnored(file.path)) return cb(null, {});
  var ers = cli.executeOnText(file.buffer.toString()).results[0].messages;
  var i, l, er;
  for (i = 0, l = ers.length; i < l; ++i) {
    er = ers[i];
    if (!er.fatal && er.severity < 2) continue;
    return cb(new Error(
      file.path + ': line ' + er.line + ', column ' + er.column + ', ' +
      er.message + ' (' + (er.ruleId || 'fatal') + ')' +
      (
        er.source ?
        '\n> ' + er.line + ' | ' + er.source + '\n  ' +
        (new Array(er.line.toString().length + 1)).join(' ') + ' | ' +
        (new Array(er.column + 1)).join(' ') + '^' :
        ''
      )
    ));
  }
  cb(null, {});
};
