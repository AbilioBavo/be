import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { FileUploadService } from 'src/storage-module/fileUpload.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, FileUploadService],
})
export class UsersModule {}
