import { websiteSSLCertificate } from "../components/acm";
import { originAccessIdentity } from "../components/originAccessIdentity";
import { websiteBucket, websiteLogBucket } from "../components/s3";
import { config } from "../config";

export const websiteCloudFrontArgs = {
  origins: [
    {
      domainName: websiteBucket.bucketRegionalDomainName,
      originId: websiteBucket.arn,
      s3OriginConfig: {
        originAccessIdentity: originAccessIdentity.cloudfrontAccessIdentityPath,
      },
    },
  ],
  enabled: true,
  isIpv6Enabled: false,
  defaultRootObject: "index.html",
  loggingConfig: {
    includeCookies: false,
    bucket: websiteLogBucket.bucketDomainName,
    prefix: config.env,
  },
  aliases: [config.websiteDomainName],
  defaultCacheBehavior: {
    allowedMethods: [
      "DELETE",
      "GET",
      "HEAD",
      "OPTIONS",
      "PATCH",
      "POST",
      "PUT",
    ],
    cachedMethods: ["GET", "HEAD"],
    targetOriginId: websiteBucket.arn,
    viewerProtocolPolicy: "redirect-to-https",
    minTtl: 0,
    defaultTtl: 31536000,
    maxTtl: 86400,
  },
  priceClass: "PriceClass_All",
  restrictions: {
    geoRestriction: {
      restrictionType: "none",
    },
  },
  viewerCertificate: {
    acmCertificateArn: websiteSSLCertificate.arn,
    sslSupportMethod: "sni-only",
  },
};
