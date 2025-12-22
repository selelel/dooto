import chalk from 'chalk';

const prefixes = {
  wait: chalk.cyan('wait') + ' -',
  error: chalk.red('error') + ' -',
  warn: chalk.yellow('warn') + ' -',
  ready: chalk.green('ready') + ' -',
  info: chalk.cyan('info') + ' -',
  event: chalk.magenta('event') + ' -',
  trace: chalk.magenta('trace') + ' -',
};

export const logger = {
  wait: (...message: any) => console.log(prefixes.wait, ...message),
  error: (...message: any) => console.error(prefixes.error, ...message),
  warn: (...message: any) => console.warn(prefixes.warn, ...message),
  ready: (...message: any) => console.log(prefixes.ready, ...message),
  info: (...message: any) => console.info(prefixes.info, ...message),
  event: (...message: any) => console.log(prefixes.event, ...message),
  trace: (...message: any) => console.log(prefixes.trace, ...message),
  log: (...message: any) => console.log(...message), // for general logs
};