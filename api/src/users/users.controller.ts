import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadDocumentRequestDto } from './dto/upload-DocumentRequest.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBody, ApiParam, ApiNotFoundResponse, ApiConsumes } from '@nestjs/swagger';

ApiTags('users');
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id/documents')
  @ApiOperation({
    summary: 'Get user documents',
    description: 'Retrieves all uploaded documents associated with a specific user.',
  })
  @ApiParam({
    name: 'id',
    example: '123',
    description: 'User ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Documents retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async getDocuments(@Param('id') id: string) {
    return this.usersService.getDocuments(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user profile',
    description: 'Retrieves the profile details of a user by ID.',
  })
  @ApiParam({
    name: 'id',
    example: '123',
    description: 'User ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async getProfile(@Param('id') id: string) {
    return this.usersService.getProfile(id);
  }

  @Post('upload-document')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  @ApiOperation({
    summary: 'Upload user document',
    description: 'Uploads a document file and associates it with a user.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '123',
        },
        truckId: {
          type: 'string',
          example: '456',
        },
        type: {
          type: 'string',
          examples: ['LICENSE', 'INSURANCE', 'OTHER'],
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['userId', 'type', 'file'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Document uploaded successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid upload payload',
  })
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadDocumentRequestDto,
  ) {
    return this.usersService.uploadDocument({
      ...body,
      file,
    });
  }

  @Post('update/:email')
  @ApiOperation({
    summary: 'Update user',
    description: 'Updates user information using their email address.',
  })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid update payload',
  })
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(email, updateUserDto);
  }

  @Post('verify/:email')
  @ApiOperation({
    summary: 'Verify user',
    description: 'Marks the user account as verified.',
  })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  @ApiResponse({
    status: 200,
    description: 'User verified successfully',
  })
  async verifyUser(@Param('email') email: string) {
    return this.usersService.verifyUser(email);
  }
  /*
  @Post('suspend/:email')
  @ApiOperation({
    summary: 'Suspend user',
    description: 'Suspends a user account.',
  })
  @ApiParam({
    name: 'email',
    example: 'user@example.com',
    description: 'User email',
  })
  @ApiResponse({
    status: 200,
    description: 'User suspended successfully',
  })
  async suspendUser(@Param('email') email: string) {
    return this.usersService.suspendUser(email);
  }*/
}
