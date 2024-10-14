import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import { config } from './config';

export interface CicdPipelineProps extends cdk.StackProps {}

export class crossaccount extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: CicdPipelineProps) {
    super(scope, id, props);

     new s3.Bucket(this, 'CodePipelineBucket', {
      bucketName: `${this.stackName}-lab`,
      lifecycleRules: [{
        id: config.bucketLifecyclePolicy.id,
        enabled: config.bucketLifecyclePolicy.status === 'Enabled',
        prefix: config.bucketLifecyclePolicy.prefix,
        transitions: [{
          storageClass: s3.StorageClass.INTELLIGENT_TIERING,
          transitionAfter: cdk.Duration.days(config.bucketLifecyclePolicy.transitionInDays),
        }],
        expiration: cdk.Duration.days(config.bucketLifecyclePolicy.expirationInDays),
      }],
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const codeDeployRole = new iam.Role(this, 'CodeDeployRole', {
      roleName: `${this.stackName}-code-deploy-role`,
      assumedBy: new iam.ServicePrincipal(`codedeploy.${cdk.Stack.of(this).region}.amazonaws.com`), 
      inlinePolicies: {
        CodeDeployPermissions: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                "ec2:Describe*",
                "s3:Get*",
                "s3:List*",
              ],
              resources: ["*"],
            }),
          ],
        }),
      },
    });

    const codeDeployApplication = new codedeploy.ServerApplication(this, 'CodeDeployApplication', {
      applicationName: `${this.stackName}-application`,
    });

     new codedeploy.ServerDeploymentGroup(this, 'DeploymentGroup', {
      application: codeDeployApplication,
      deploymentGroupName: `${this.stackName}-deploygroup`, 
      role: codeDeployRole,
      // role: ,
      ec2InstanceTags: new codedeploy.InstanceTagSet({
        'Name': ['matson'], 
      }),
      autoRollback: {
        failedDeployment: true,
      },
      deploymentConfig: codedeploy.ServerDeploymentConfig.ALL_AT_ONCE,
    });
  }

}
