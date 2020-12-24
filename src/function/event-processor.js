import middy from '@middy/core';
import { myMiddleware } from './middleware/my-middleware';

async function waitFor() {
  console.log('waitFor called');
  return Promise.resolve('success');
}

const originalHandler = async (event) => {
  console.log('Lambda function called');
  console.log(`event: ${JSON.stringify(event)}`);
  await waitFor();
  nofunction(); // This will throw error
  console.log('executing after waitFor');
};

const handler = middy(originalHandler);

handler.use(myMiddleware({}));

export { handler };
