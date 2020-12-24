import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as path from 'path';

export class NodeStarterStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const srcDirectory = '../build';
    const lambdaFunctionName = 'event-processor';
    const lambdaFunctionSrcDir = `${srcDirectory}/${lambdaFunctionName}`;
    console.log(path.join(__dirname, lambdaFunctionSrcDir));
    
    // The code that defines your stack goes here
    const fn = new lambda.Function(this, `${lambdaFunctionName}-id`, {
      functionName: lambdaFunctionName,
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: `${lambdaFunctionName}.handler`,
      code: lambda.Code.fromAsset(path.join(__dirname, lambdaFunctionSrcDir)),
    });
  }
}
