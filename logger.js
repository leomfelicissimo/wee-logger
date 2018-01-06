const LOG_LEVEL_ERROR = 'ERROR';
const LOG_LEVEL_INFO = 'INFO';
const LOG_LEVEL_ALL = 'ALL';
const LOG_LEVEL_DEBUG = 'DEBUG';
const OUTPUT_ERROR_FUNCTION = console.error;
const OUTPUT_INFO_FUNCTION = console.info;

const canLogLevel = logLevel =>
  (process.env.LOG_LEVEL && process.env.LOG_LEVEL.includes(logLevel)) || process.env.LOG_LEVEL === LOG_LEVEL_ALL;

const getLoggerByLevel = (logLevel) => {
  const createLogger = logFunction =>
    (level, section, message) => logFunction(`[${level}] ${section} - ${JSON.stringify(message)}`);

  return logLevel === LOG_LEVEL_ERROR ?
    createLogger(OUTPUT_ERROR_FUNCTION) : createLogger(OUTPUT_INFO_FUNCTION);
};

const log = (section, logLevel, message) => {
  const logger = getLoggerByLevel(logLevel);
  if (canLogLevel(logLevel)) {
    logger(logLevel, section, message);
  }
};

const error = (section, err) => {
  const logError = description => log(section, LOG_LEVEL_ERROR, description);
  if (err instanceof Error) {
    logError(`message: ${err.message}`);
    logError(`stack: ${err.stack}`);
  } else {
    logError(err);
  }
};

const info = (section, message) => log(section, LOG_LEVEL_INFO, message);
const debug = (section, message) => log(section, LOG_LEVEL_DEBUG, message);

export default {
  error,
  info,
  debug,
};