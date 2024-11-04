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
  @IsNotEmpty()
  @IsNumber()
  userId?: number;

  @IsNotEmpty()
  @IsString()
  email?: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsNotEmpty()
  @IsString()
  username?: string;

  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @IsNotEmpty()
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
  packageId?: number;

  @IsOptional()
  @IsString()
  createdAt?: string;
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
