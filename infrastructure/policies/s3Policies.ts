// Create policy for website bucket
export function websiteBucketPolicy(
  bucketArn: string,
  lambdaRoleArn: string,
  oaiArn: string
): string {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      // Only lambda function with lambda role can put objects
      {
        Effect: "Allow",
        Principal: {
          AWS: lambdaRoleArn,
        },
        Action: ["s3:PutObject"],
        Resource: [`${bucketArn}/*`],
      },
      // Can only get items via cloudfront
      {
        Effect: "Allow",
        Principal: oaiArn,
        Action: ["s3:GetObject"],
        Resource: [`${bucketArn}/*`],
      },
    ],
  });
}
