import middy from '@middy/core';
import { myMiddleware } from './middleware/my-middleware';
import { appSyncLambdaContextKeys } from './middleware/logger-utils';
import { middleware, logger } from './middleware/logger';

async function waitFor() {
  logger.log('waitFor called');
  return Promise.resolve('success');
}

const originalHandler = async (event) => {
  logger.debug('Lambda function called');
  // console.log('Lambda function called');
  logger.warn('event:', event);
  await waitFor();
  // nofunction(); // This will throw error
  logger.error('executing after waitFor');
  return { success: 'true' };
};

const handler = middy(originalHandler);

handler.use(middleware(appSyncLambdaContextKeys)).use(myMiddleware({}));

export { handler };
