const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: (handler, next) => {
      // might read options from `config`
      console.log('myMiddleware.before');
      // Add config to context
      console.log(`handler.context: ${JSON.stringify(handler.context)}`);
      next();
    },
    after: (handler, next) => {
      // might read options from `config`
      console.log('myMiddleware.after');
      next();
    },
    onError: (handler, next) => {
      // might read options from `config`
      if (handler.error) {
        console.log('myMiddleware.onError');
        console.error(handler.error);
      }
    },
  };
};

export { myMiddleware };
