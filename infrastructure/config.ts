/// <reference types="node" />
import { getStack } from "@pulumi/pulumi";

type Config = {
  env: string;
  appName: string;
  stack: string;
  websiteDomainName: string;
};

if (
  !process.env.ENV ||
  !process.env.APP_NAME ||
  !process.env.WEBSITE_DOMAIN_NAME ||
  !process.env.AWS_REGION ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  throw new Error(
    "Missing one of the following require environment variables: ENV, APP_NAME, WEBSITE_DOMAIN_NAME, AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY"
  );
}

export const config: Config = {
  env: process.env.ENV,
  appName: process.env.APP_NAME,
  stack: getStack(),
  websiteDomainName: process.env.WEBSITE_DOMAIN_NAME,
};
