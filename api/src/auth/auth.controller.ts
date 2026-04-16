import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-Password.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBody } from '@nestjs/swagger';
import { CreateSupplierProfileDto } from './dto/create-supplier.dto';
import { JwtGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createAuthDto: RegisterDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Login a user',
    description: 'Authenticates a user using email and password and returns an access token.',
  })
  @ApiBody({
    type: LoginDto,
    description: 'User login credentials',
    examples: {
      example1: {
        summary: 'Valid login payload',
        value: {
          email: 'user@example.com',
          password: 'strongPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully authenticated',
    schema: {
      example: {
        accessToken: 'jwt-token-here',
        user: {
          id: 1,
          email: 'user@example.com',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid email or password',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request payload',
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('token-refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh authentication token' })
  refreshToken(@Body('id') userId: string) {
    return this.authService.refreshToken(userId);
  }
  @Post('reset-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'reset password request',
    description: 'description',
  })
  @ApiBody({
    type: String,
    description: 'User email for password reset',
    examples: {
      example1: {
        summary: 'User email for password reset',
        value: {
          email: 'user@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'otp code sent to email if it exists',
  })
  resetPassword(@Body('email') email: string) {
    return this.authService.resetPassword(email);
  }
  @Post('confirm-reset-password')
  @ApiOperation({
    summary: 'Confirm reset password request',
    description: 'description',
  })
  @ApiBody({
    type: ResetPasswordDto,
    description:
      'User email, otp code and new password for confirming password reset',
    examples: {
      example1: {
        summary:
          'User email, otp code and new password for confirming password reset',
        value: {
          email: 'user@example.com',
          otp: '123456',
          newPassword: 'newPassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'otp code sent to email if it exists',
  })
  @HttpCode(200)
  confirmResetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.confirmResetPassword(resetPasswordDto);
  }
  @Post('create-supplier')
  @ApiOperation({
    summary: 'Create supplier profile',
    description: 'Creates a supplier profile for a user with the given details.',
  })
  @UseGuards(JwtGuard)
  createSupplierProfile(@Request() request, @Body() dto: CreateSupplierProfileDto) {
    return this.authService.createSupplierProfile(request.user.userId, dto);
  }
}
