#!/usr/bin/env node

const cdk = require('@aws-cdk/core');
const { NodeStarterStack } = require('../lib/node-starter-stack');

const app = new cdk.App();
new NodeStarterStack(app, 'NodeStarterStack');
