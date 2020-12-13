const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const NodeStarter = require('../lib/node-starter-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new NodeStarter.NodeStarterStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
