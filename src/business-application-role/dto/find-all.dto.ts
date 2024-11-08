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
  businessApplicationRoleId?: number;

  @IsOptional()
  @IsNumber()
  businessRoleId?: number;

  @IsOptional()
  @IsNumber()
  applicationRoleId?: number;

  @IsOptional()
  @IsNumber()
  applicationId?: number;

  // @IsOptional()
  // @IsNumber()
  // lovStatusId?: number;
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
