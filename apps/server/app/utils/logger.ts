import winston = require('winston');

const LOG_LEVEL = process.env.LOG_LEVEL || 'error';

const customLevels = {
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    crit: 5,
    fatal: 6
  },
  colors: {
    TRACE: 'white',
    DEBUG: 'green',
    INFO: 'green',
    WARN: 'yellow',
    ERROR: 'red',
    CRIT: 'red',
    FATAL: 'red'
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