import winston = require('winston');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const customLevels = {
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    crit: 4,
    fatal: 5
  },
  colors: {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
  }
};

winston.addColors(customLevels.colors);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp(),
  winston.format.printf((info) => {
    const { timestamp, level, message } = info;
    const msg = message instanceof Error ? message.stack || message.message : message;
    return `${timestamp} ${level}: ${msg}`;
  })
);

export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({ format: consoleFormat })
  ]
});