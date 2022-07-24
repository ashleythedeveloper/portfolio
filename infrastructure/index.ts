import * as s3Buckets from "./components/s3";
import * as cloudFront from "./components/cloudFront";
import * as route53 from "./components/route53";

export = async () => {
  return {
    s3Buckets,
    route53,
    cloudFront,
  };
};
