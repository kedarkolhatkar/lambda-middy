const handler = (event, context) => {
  console.log('Lambda function called');
  console.log(`event: ${JSON.stringify(event)}`);
};

export { handler };
