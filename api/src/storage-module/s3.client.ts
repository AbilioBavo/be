import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();
const endpoint = process.env.MINIO_ENDPOINT;
const accessKeyId = process.env.MINIO_USER;
const secretAccessKey = process.env.MINIO_PASSWORD;
const region = process.env.MINIO_REGION || 'us-east-1';

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.log('endpoint: ', endpoint);
  console.log('accessKeyId: ', accessKeyId);
  console.log('secretAccessKey: ', secretAccessKey);
  throw new Error('Missing MinIO environment variables');
}

export const s3Client = new S3Client({
  endpoint,
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  forcePathStyle: true,
});
