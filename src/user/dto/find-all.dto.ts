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
  userId?: number;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  @IsNumber()
  lovGenderTypeId?: number;

  @IsOptional()
  @IsNumber()
  lovUserTypeId?: number;

  @IsOptional()
  @IsNumber()
  lovEmailVerificationTypeId?: number;

  @IsOptional()
  @IsNumber()
  organizationId?: number;

  @IsOptional()
  @IsNumber()
  packageId?: number;

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
