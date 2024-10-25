import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class RegisterDataPayloadDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  middleName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  profileImage: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsNumber()
  lovGenderTypeId: number;

  @IsOptional()
  @IsNumber()
  lovUserTypeId: number;

  @IsOptional()
  @IsNumber()
  lovEmailVerificationTypeId: number;

  @IsOptional()
  @IsNumber()
  packageId: number;

  @IsOptional()
  @IsString()
  createdAt: string;

  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @IsOptional()
  @IsString()
  dmlTimestamp?: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => RegisterDataPayloadDto)
  @IsArray()
  data: RegisterDataPayloadDto[];
}
