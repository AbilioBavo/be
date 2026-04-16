"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Client = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var dotenv = require("dotenv");
dotenv.config();
var endpoint = process.env.MINIO_ENDPOINT;
var accessKeyId = process.env.MINIO_USER;
var secretAccessKey = process.env.MINIO_PASSWORD;
var region = process.env.MINIO_REGION || 'us-east-1';
if (!endpoint || !accessKeyId || !secretAccessKey) {
    console.log('endpoint: ', endpoint);
    console.log('accessKeyId: ', accessKeyId);
    console.log('secretAccessKey: ', secretAccessKey);
    throw new Error('Missing MinIO environment variables');
}
exports.s3Client = new client_s3_1.S3Client({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
    forcePathStyle: true,
});
