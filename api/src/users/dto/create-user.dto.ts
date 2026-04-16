import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
//import { UserRole, AccountStatus } from '../../../generated/prisma/enums';
import { UserRole, AccountStatus } from '../../generated/prisma/enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string; // plain password, will hash before saving

  @IsOptional()
  @IsString()
  phone?: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsEnum(AccountStatus)
  status?: AccountStatus; // default can be 'PENDING' in service
}
