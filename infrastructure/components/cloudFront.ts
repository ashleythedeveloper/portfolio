import * as aws from "@pulumi/aws";
import { websiteCloudFrontArgs } from "../cloudfront/websiteArgs";
import { config } from "../config";

const stack = config.stack;

// Create cloudFront distribution
export const websiteCloudFrontDistribution = new aws.cloudfront.Distribution(
  `${stack}-website-cloud-front-distribution`,
  websiteCloudFrontArgs
);
