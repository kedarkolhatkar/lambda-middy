import { commonContextKeys } from './logger-utils';

/* eslint-disable no-console */
const SEVERETY = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

function getSetKey(logContext) {
  return (key, value) => {
    logContext.keys.set(key, value);
  };
}

function setupContext(lambdaContext, logContext, getContextKeys) {
  // console.log(`setting context keys: lambdaContext=${JSON.stringify(lambdaContext)}`);
  if (!lambdaContext) {
    return;
  }

  let contextKeysFunc;
  if (getContextKeys && typeof getContextKeys === 'function') {
    contextKeysFunc = getContextKeys;
  } else {
    contextKeysFunc = commonContextKeys;
  }

  const logContextKeys = contextKeysFunc(lambdaContext);
  console.log(`setcontextkeys keys=${JSON.stringify(logContextKeys)}`);

  Object.entries(logContextKeys).forEach(([key, value]) => {
    logContext.keys.set(key, value);
  });

  // console.log(`logContext.keys before setting  ${JSON.stringify(logContext.keys)}`);

  // logContext.keys.set('functionName', lambdaContext.functionName);
  console.log(`map.size=${logContext.keys.size}`);
}

function getMiddleware(logContext) {
  return (getContextKeys) => ({
    before: (handler, next) => {
      // Add config to context
      console.log(`middleware.before handler: ${JSON.stringify(handler)} lambdaContext=${handler.context}`);
      setupContext(handler.context, logContext, getContextKeys);
      next();
    },
    after: (handler, next) => {
      console.log(`logger.middleware.after handler.response: ${JSON.stringify(handler.response)}`);
      next();
    },
    onError: (handler, next) => {
      if (handler.error) {
        console.log('logger.middleware.onError');
        console.error(handler.error);
      }
      next();
    },
  });
}

/**
 * stringifies all the arguments and concatenates to form a message
 * @param  {...any} args
 * @returns stringified message
 */
function stringify(...args) {
  let message = '';
  if (args && Array.isArray(args)) {
    args.forEach((value) => {
      if (typeof value === 'string') {
        message = message ? `${message} ${value}` : value;
      } else if (typeof value === 'object') {
        message = message ? `${message} ${JSON.stringify(value)}` : JSON.stringify(value);
      }
    });
  }

  return message;
}

function getKeyedMesssage(logContext) {
  const log = {};
  logContext.keys.forEach((value, key) => {
    log[key] = typeof value === 'function' ? value() : value;
  });
  return log;
}

function formatMessage(...args) {
  const stringMsg = stringify(...args);
  return `${stringMsg}`;
}

function writeLog(logContext, severity, ...args) {
  const msg = formatMessage(...args);
  const keyedMessage = getKeyedMesssage(logContext);
  keyedMessage.message = msg;
  keyedMessage.severity = severity;

  const message = `${severity} ${msg} ${logContext.delimeter}${JSON.stringify(keyedMessage)}${logContext.delimeter}`;
  switch (severity) {
    case SEVERETY.ERROR:
      console.error(message);
      return;
    case SEVERETY.WARN:
      console.warn(message);
      return;
    case SEVERETY.DEBUG:
      console.debug(message);
      return;
    case SEVERETY.INFO:
    default:
      console.log(message);
  }
}

function wrapLog(logContext) {
  return (severity) => (...args) => writeLog(logContext, severity, ...args);
}

function createLogger(logContext) {
  const severityLog = wrapLog(logContext);
  return {
    debug: severityLog(SEVERETY.DEBUG),
    log: severityLog(SEVERETY.INFO),
    warn: severityLog(SEVERETY.WARN),
    error: severityLog(SEVERETY.ERROR),
    setKey: getSetKey(logContext),
  };
}

/**
 *
 */
function Logger() {
  // console.log('in Logger');

  const logContext = {
    keys: new Map(),
    delimeter: '__LOG_OBJECT__',
  };

  return {
    middleware: getMiddleware(logContext),
    logger: createLogger(logContext),
  };
}

export { Logger };
