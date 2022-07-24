/// <reference types="node" />
import * as s3 from "@pulumi/aws/s3";
import * as pulumi from "@pulumi/pulumi";
import * as fs from "fs";
import * as path from "path";
import * as mime from "mime";

export const populateBucket = (dir: string, bucket: s3.Bucket): void => {
  // For each file in the directory, create an S3 object stored in `siteBucket`
  for (let item of fs.readdirSync(dir)) {
    let filePath = path.join(dir, item);
    new s3.BucketObject(item, {
      bucket: bucket,
      source: new pulumi.asset.FileAsset(filePath), // use FileAsset to point to a file
      contentType: mime.getType(filePath) || undefined, // set the MIME type of the file
    });
  }
};
