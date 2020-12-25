/* eslint-disable no-console */
function middleware(config) {
  return {
    before: (handler, next) => {
      console.log('logger.middleware.before');
      // Add config to context
      console.log(`handler: ${JSON.stringify(handler, null, 2)}`);
      console.log(`handler.context: ${JSON.stringify(handler.context)}`);
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
  };
}

function logMessage(message) {
  console.log(message);
}

/**
 *
 */
function Logger() {
  console.log('in Logger');
  return {
    middleware,
    log: logMessage,
  };
}

export { Logger };
