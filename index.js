const eslint = require('eslint');

module.exports = ({file: {buffer, path}, options}) => {
  const cli = new eslint.CLIEngine(options);
  if (cli.isPathIgnored(path)) return;

  const ers = cli.executeOnText(buffer.toString(), path).results[0].messages;
  for (let i = 0, l = ers.length; i < l; ++i) {
    const er = ers[i];
    if (!er.fatal && er.severity < 2) continue;
    throw new Error(
      `${path}: line ${er.line}, column ${er.column}, ` +
      `${er.message}  (${er.ruleId || 'fatal'})` +
      (
        er.source ?
        `\n> ${er.line} | ${er.source}\n  ` +
        `${(new Array(er.line.toString().length + 1)).join(' ')} | ` +
        `${(new Array(er.column)).join(' ')}^` :
        ''
      )
    );
  }
};
