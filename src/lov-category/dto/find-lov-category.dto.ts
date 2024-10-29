//import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { metaDataDto, paginationDto } from 'src/utils/commonDtos.dto';

export class FindDataPayloadDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}

export class FindAllLovCategoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindDataPayloadDto)
  @IsArray()
  data: FindDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
