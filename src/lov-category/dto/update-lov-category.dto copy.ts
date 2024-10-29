import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';
import { Column } from 'typeorm';
//import { PartialType } from '@nestjs/swagger';

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

export class UpdateLovCategoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
