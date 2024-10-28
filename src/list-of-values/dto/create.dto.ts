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
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  lovCategoryId: number;

  @IsNotEmpty()
  @IsNumber()
  lovStatusId: number;

  @IsOptional()
  @IsNumber()
  sequenceNo: number;

  @IsOptional()
  @IsString()
  cssClasses: string;

  @IsOptional()
  @IsString()
  cssSeverity: string;
}

export class CreateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDataPayloadDto)
  @IsArray()
  data: CreateDataPayloadDto[];
}
