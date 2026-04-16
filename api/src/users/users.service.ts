import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';
import { AccountStatus } from '../generated/prisma/enums';
import { ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { GetProfileDto } from './dto/get-profile.dto';
//import { file } from '../generated/prisma/models';
import { FileUploadService } from 'src/storage-module/fileUpload.service';
import { UploadDocumentInput } from './dto/upload-DocumentRequest.dto';
//import { GetDocumentAggregateType } from '../../dist/src/generated/prisma/models/Document';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService,
  ) {}
  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new ConflictException('User not found');
    }
    const userProfile = new GetProfileDto({
      userId: user.id,
      email: user.email,
      phone: user.phone || undefined,
      role: user.role,
      status: user.status,
    });
    return userProfile;
  }
  async uploadDocument(data: UploadDocumentInput) {
    const { userId, truckId, type, file } = data;
    const fileUrl = await this.fileUploadService.uploadFile(file, type, userId);
    return this.prisma.document.create({
      data: {
        userId,
        truckId,
        docType: type,
        url: fileUrl,
      },
    });
  }
  async getDocuments(userId: string) {
    return this.prisma.document.findMany({
      where: {
        userId,
      },
    });
  }
  async update(email: string, updateUserDto: UpdateUserDto) {
    const update = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        phone: updateUserDto.phone,
      },
    });
    return 'User updated successfully';
  }
  async verifyUser(email: string) {
    const user = await this.prisma.user.update({
       where: { email },
       data: { status: AccountStatus.ACTIVE } });
    if (!user) {
      throw new ConflictException('User not found');
    }

    return 'User verified successfully';
  }
  async suspenndUser(email: string){
    //TODO: this will have to create a record in audit log with the reason for suspension and the admin who performed the action
    const user = await this.prisma.user.update({
      where: { email },
      data: { status: AccountStatus.SUSPENDED } });
    if (!user) {
      throw new ConflictException('User not found');
    }

    return 'User suspended successfully';
  }
}
