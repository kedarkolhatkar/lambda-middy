import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as NodeStarter from '../lib/node-starter-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NodeStarter.NodeStarterStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
