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

export class UpdateDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  applicationRoleId: number;

  @IsNotEmpty()
  @IsNumber()
  applicationId: number;

  @IsNotEmpty()
  @IsNumber()
  applicationRoleCategoryId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsNumber()
  applicationRoleStatusLovId: number;
}

export class UpdateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
