import { S3Client } from '@aws-sdk/client-s3'
import { type NodeJsClient } from '@smithy/types'

export default new S3Client({
  region: process.env.AWS_REGION
  // accessKeyId: process.env.AWS_ACCESS_ID,
  // secretAccessKey: process.env.AWS_SECRET_KEY
}) as NodeJsClient<S3Client>
