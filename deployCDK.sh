#!/bin/bash
set -e

echo 'Build Lambda Function'
npm run bundle-lambda

echo 'Deploy Lambda'
cdk deploy