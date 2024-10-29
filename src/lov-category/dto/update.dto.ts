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
  lovCategoryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class UpdateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
