import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { paginationDto } from 'src/utils/commonDtos.dto';

export class FindAllDataPayloadDto {
  @IsOptional()
  @IsNumber()
  listOfValuesId: number;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  lovCategoryId: number;

  @IsOptional()
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

export class FindAllDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllDataPayloadDto)
  @IsArray()
  data: FindAllDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
