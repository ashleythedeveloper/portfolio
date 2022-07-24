import * as aws from "@pulumi/aws";
import { config } from "../config";

const stack = config.stack;

// Generate origin access identity
export const originAccessIdentity = new aws.cloudfront.OriginAccessIdentity(
  `${stack}-origin-access-identity`,
  {}
);
