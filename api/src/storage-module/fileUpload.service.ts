import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { DocType } from '../generated/prisma/enums';
import { s3Client } from './s3.client';

@Injectable()
export class FileUploadService {
  private readonly bucket = process.env.MINIO_BUCKET!;
  private readonly publicUrl = process.env.MINIO_PUBLIC_URL!;

  async uploadFile(
    file: Express.Multer.File,
    type?: DocType,
    userId?: string,
  ): Promise<string> {
    try {
      const extension =
        file.originalname.split('.').pop() ||
        file.mimetype.split('/')[1] ||
        'pdf';

const prefix = userId ? `${userId}-` : '';
const fileName = `${prefix}${randomUUID()}.${extension}`;

const key = type
  ? `${type}/${fileName}`
  : fileName;

const command = new PutObjectCommand({
  Bucket: this.bucket,
  Key: key,
  Body: file.buffer,
  ContentType: file.mimetype,
});

await s3Client.send(command);

return `${this.publicUrl}/${this.bucket}/${key}`;
}catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Failed to upload file',
      );
    }
  }
}
