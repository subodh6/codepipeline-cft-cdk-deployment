import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { crossaccount } from '../lib/cross-account';

const app = new cdk.App();

new crossaccount(app, 'cdk-cft-cicd', {
  env: { account: '954503069243', region: 'us-east-1' },
});
