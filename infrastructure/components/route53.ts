import * as aws from "@pulumi/aws";
import { config } from "../config";
import { websiteSSLCertificate } from "./acm";
import { websiteCloudFrontDistribution } from "./cloudFront";

const stack = config.stack;

// create provider
export const provider = new aws.Provider(`${stack}-provider-us-east-1"`, {
  region: "us-east-1",
});

// Create a hosted zone for website
const hostedZone = new aws.route53.Zone(`${stack}-dns-zone`, {
  name: config.websiteDomainName,
});

// Create DNS record to prove ownership of the domain
export const sslValidationDnsRecord = new aws.route53.Record(
  `${stack}-website-ssl-validation-record`,
  {
    zoneId: hostedZone.id,
    name: websiteSSLCertificate.domainValidationOptions[0].resourceRecordName,
    type: websiteSSLCertificate.domainValidationOptions[0].resourceRecordType,
    records: [
      websiteSSLCertificate.domainValidationOptions[0].resourceRecordValue,
    ],
    ttl: 10 * 60, // 10 minutes
  }
);

// Create website domain name
export const websiteDomainName = new aws.apigateway.DomainName(
  `${stack}-website-domain-name`,
  {
    certificateArn: websiteSSLCertificate.arn,
    domainName: config.websiteDomainName,
  }
);

// Add website dns record
const dnsRecord = new aws.route53.Record("website-dns", {
  zoneId: hostedZone.id,
  type: "A",
  name: config.websiteDomainName,
  aliases: [
    {
      name: websiteCloudFrontDistribution.domainName,
      evaluateTargetHealth: false,
      zoneId: websiteCloudFrontDistribution.hostedZoneId,
    },
  ],
});
