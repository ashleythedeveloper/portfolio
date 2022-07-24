import * as aws from "@pulumi/aws";
import { config } from "../config";
import { provider, sslValidationDnsRecord } from "../components/route53";

const stack = config.stack;

// Create ssl cert for website
export const websiteSSLCertificate = new aws.acm.Certificate(
  `${stack}-website-ssl-certificate`,
  {
    domainName: config.websiteDomainName,
    validationMethod: "DNS",
  },
  { provider: provider }
);

// Validate ssl cert for website
new aws.acm.CertificateValidation(
  `${stack}-api-ssl-cert-validation`,
  {
    certificateArn: websiteSSLCertificate.arn,
    validationRecordFqdns: [sslValidationDnsRecord.fqdn],
  },
  { provider: provider }
);
