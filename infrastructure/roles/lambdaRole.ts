import { config } from "../config";
import * as aws from "@pulumi/aws";

const stack = config.stack;
const appName = config.appName;

// Create lambda role
export const lambdaRole = new aws.iam.Role(`${stack}-lambda-role`, {
  assumeRolePolicy: JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: `${appName}LambdaRole`,
        Action: "sts:AssumeRole",
        Principal: {
          Service: "lambda.amazonaws.com",
        },
        Effect: "Allow",
      },
    ],
  }),
});
