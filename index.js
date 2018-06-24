const eslint = require('eslint');

const repeat = (str, times) => (new Array(times)).join(str);

module.exports = ({file: {buffer, path}, options}) => {
  const cli = new eslint.CLIEngine(Object.assign(options));
  if (cli.isPathIgnored(path)) return;

  const source = buffer.toString();
  const sourceLines = source.split(/\r?\n/);
  cli.executeOnText(source, path).results[0].messages.forEach(({
    column,
    fatal,
    line,
    message,
    ruleId,
    severity,
    endColumn = column,
    endLine = line
  }) => {
    if (!fatal && severity < 2) return;

    let highlight = '';
    const space = endLine.toString().length;
    for (let i = line; i <= endLine; ++i) {
      const sourceLine = sourceLines[i - 1];
      const start = i === line ? column : 1;
      const end = i === endLine ? endColumn : sourceLine.length + 1;
      highlight +=
        `\n> ${repeat(' ', space - i.toString().length)}${i} | ${sourceLine}` +
        `\n  ${repeat(' ', space)}  | ` +
        repeat(' ', start) + repeat('^', end - start + 1);
    }

    throw new Error(
      `${path} [${line}:${column} - ${endLine}:${endColumn}] ` +
      `${message} (${ruleId || 'fatal'})` +
      highlight
    );
  });
};
