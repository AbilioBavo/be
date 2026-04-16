import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsEnum,
  IsUUID,
  Min,
} from 'class-validator';
import { PricingUnit } from 'src/generated/prisma/browser';

export class CreateProductDto {
 /* @IsUUID()
  supplierId: string;
*/
  @IsString()
  name: string;

  @IsString()
  categoryId: string;

  @IsEnum(PricingUnit)
  unit: PricingUnit;

  @IsNumber()
  @Min(0)
  pricePerUnit: number;

  @IsNumber()
  @Min(0)
  stockQuantity: number;

  @IsNumber()
  @Min(0)
  minOrderQty: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  photoUrls: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
