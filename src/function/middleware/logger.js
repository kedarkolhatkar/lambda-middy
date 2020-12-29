import { Logger } from './lambda-logger';

function contextKeys(lambdaContext) {
  // const region =
  return { functionName: lambdaContext.functionName, functionArn: lambdaContext.invokedFunctionArn };
}

export const { logger, middleware } = Logger({ getContextKeys: contextKeys });
