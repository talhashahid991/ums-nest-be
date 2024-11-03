import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  createdAt: string;

  @IsOptional()
  @IsString()
  updatedAt?: string;

  @IsOptional()
  @IsNumber()
  dmlUserId?: number;

  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @IsOptional()
  @IsString()
  dmlTimestamp?: string;
}

export class CreateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDataPayloadDto)
  @IsArray()
  data: CreateDataPayloadDto[];
}
