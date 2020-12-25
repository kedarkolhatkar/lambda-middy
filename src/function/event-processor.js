import middy from '@middy/core';
import { myMiddleware } from './middleware/my-middleware';
import logger from './middleware/logger';

async function waitFor() {
  logger.log('waitFor called');
  return Promise.resolve('success');
}

const originalHandler = async (event) => {
  logger.log('Lambda function called');
  // console.log('Lambda function called');
  logger.log(`event: ${JSON.stringify(event)}`);
  await waitFor();
  // nofunction(); // This will throw error
  logger.log('executing after waitFor');
  return { success: 'true' };
};

const handler = middy(originalHandler);

handler.use(logger.middleware({})).use(myMiddleware({}));

export { handler };
