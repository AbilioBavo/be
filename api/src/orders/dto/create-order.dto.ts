import {
  IsString,
  IsUUID,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsEnum,
  Min,
} from 'class-validator';
import { DeliveryType } from '../../generated/prisma/enums';

export class CreateOrderDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(0.1)
  quantity: number;

  @IsString()
  deliveryAddress: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsDateString()
  scheduledAt: string;

  @IsEnum(DeliveryType)
  deliveryType: DeliveryType;

  @IsBoolean()
  isCod: boolean;
}
