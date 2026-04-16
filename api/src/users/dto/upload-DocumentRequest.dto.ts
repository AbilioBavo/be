import {
  IsEnum,
  IsUUID,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { DocType } from '../../generated/prisma/enums';

export class UploadDocumentRequestDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsOptional()
  truckId?: string;

  @IsEnum(DocType)
  @IsNotEmpty()
  type: DocType;
}
export type UploadDocumentInput = UploadDocumentRequestDto & {
  file: Express.Multer.File;
};
