import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { paginationDto } from 'src/utils/commonDtos.dto';

export class FindAllDataPayloadDto {
  @IsOptional()
  @IsNumber()
  emailId?: number;

  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  createdAt?: string;
}

export class FindAllDto {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FindAllDataPayloadDto)
  @IsArray()
  data: FindAllDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
