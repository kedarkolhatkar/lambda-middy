const myMiddleware = (config) => {
  // might set default options in config
  return {
    before: (handler, next) => {
      // might read options from `config`
      console.log('myMiddleware.before');
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
        console.error(handler.error);
      }
    },
  };
};

export { myMiddleware };
