import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  listOfValuesId: number;

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

export class UpdateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
