import { Module } from '@nestjs/common';
import { FileUploadService } from './fileUpload.service';

@Module({
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class StorageModuleModule {}
