import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { config } from "../config";
import { websiteBucketPolicy } from "../policies/s3Policies";
import { lambdaRole } from "../roles/lambdaRole";
import { originAccessIdentity } from "../components/originAccessIdentity";
import { populateBucket } from "../utils";

const stack = config.stack;

const websiteDir = "../../artifacts/website-build";

// Create bucket for website
export const websiteBucket = new aws.s3.Bucket(`${stack}-website-bucket`, {
  bucket: `${stack}-website-bucket`,
  website: { indexDocument: "index.html", errorDocument: "index.html" },
});

// Attach policy to website bucket
new aws.s3.BucketPolicy(`${stack}-website-bucket-policy`, {
  bucket: websiteBucket.bucket,
  policy: pulumi
    .all([websiteBucket.arn, lambdaRole.arn, originAccessIdentity.iamArn])
    .apply(([bucketArn, roleArn, oaiArn]) =>
      websiteBucketPolicy(bucketArn, roleArn, oaiArn)
    ),
});

// Add the website build files to websiteBucket
populateBucket(websiteDir, websiteBucket);

// Create bucket for website logs
export const websiteLogBucket = new aws.s3.Bucket(
  `${stack}-website-Log-bucket`,
  {
    bucket: `${stack}-website-log-bucket`,
  }
);
