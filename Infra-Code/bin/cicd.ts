import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { crossaccount } from '../lib/cross-account';

const app = new cdk.App();

new crossaccount(app, 'helloworld-app-stack', {
  env: { account: '954503069243', region: 'ap-south-1' },
});
