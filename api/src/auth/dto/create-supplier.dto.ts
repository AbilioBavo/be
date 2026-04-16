import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateSupplierProfileDto {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  nuit?: string;

  //@IsNotEmpty()
  @IsOptional()
  @IsString()
  // store as "POINT(lon lat)" string for now if using Unsupported("point")
  location: string;

  @IsOptional()
  @IsNumber()
  deliveryRadiusKm?: number;

  @IsOptional()
  @IsString()
  bankAccountRef?: string;

  @IsOptional()
  @IsNumber()
  commissionRate?: number;
}
