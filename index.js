import eslint from 'eslint';

const repeat = (str, times) => new Array(times + 1).join(str);

export default ({ file: { buffer, path }, options }) => {
  const cli = new eslint.CLIEngine(Object.assign(options));
  if (cli.isPathIgnored(path)) return;

  const source = buffer.toString();
  const sourceLines = source.split(/\r?\n/);
  cli
    .executeOnText(source, path)
    .results[0].messages.forEach(
      ({
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
          const start = i === line ? column - 1 : 0;
          const end = i === endLine ? endColumn - 1 : sourceLine.length;

          if (i === line) {
            highlight +=
              `\n  ${repeat(' ', space)} | ` +
              repeat(' ', start) +
              repeat('v', Math.max(end - start, 1));
          }

          highlight += `\n> ${repeat(
            ' ',
            space - i.toString().length
          )}${i} | ${sourceLine}`;

          if (i === endLine) {
            highlight +=
              `\n  ${repeat(' ', space)} | ` +
              repeat(' ', start) +
              repeat('^', Math.max(end - start, 1));
          }
        }

        throw new Error(
          `${path} [${line}:${column} - ${endLine}:${endColumn}] ` +
            `${message} (${ruleId || 'fatal'})` +
            highlight
        );
      }
    );
};
