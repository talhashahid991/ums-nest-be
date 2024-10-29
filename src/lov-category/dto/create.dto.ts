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
  description?: string;
}

export class CreateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDataPayloadDto)
  @IsArray()
  data: CreateDataPayloadDto[];
}
