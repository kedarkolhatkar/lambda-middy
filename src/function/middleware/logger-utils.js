function getAWSAccount(lambdaArn) {
  const parts = lambdaArn.split();
  return parts[4];
}

function getRegion(lambdaArn) {
  const parts = lambdaArn.split();
  return parts[3];
}

/**
 * This function is a default implementation to extract metadata from various sources,
 * such as lambdaContext, lambda process.env and returns as a javascript object. This
 * metadata is logged by the logger with each log statement
 * @param {*} lambdaContext
 * @returns {object} javascript object which includes the metadata to be logged
 */
function commonContextKeys(lambdaContext) {
  return {
    functionName: lambdaContext.functionName,
    functionArn: lambdaContext.invokedFunctionArn,
    account: getAWSAccount(lambdaContext.invokedFunctionArn),
    region: getRegion(lambdaContext.invokedFunctionArn),
  };
}

function appSyncLambdaContextKeys(lambdaContext) {
  const ctxKeys = commonContextKeys(lambdaContext);
  const additionalKeys = { tenantBid: '123' };

  return { ...ctxKeys, ...additionalKeys };
}

export { commonContextKeys, appSyncLambdaContextKeys };
