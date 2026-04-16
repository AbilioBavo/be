import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
//import { UserRole, AccountStatus } from '../../../generated/prisma/enums';
import { UserRole, AccountStatus } from '../../generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    example: 'fahim@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    example: 'password123',
  })
  password: string; // plain password, will hash before saving

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '+2588266...',
  })
  phone?: string;

  @IsEnum(UserRole)
  role: UserRole;

 /* @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus; */// default can be 'PENDING' in service
}
