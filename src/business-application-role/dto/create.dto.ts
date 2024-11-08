import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  businessRoleId: number;

  @IsOptional()
  @IsNumber()
  applicationRoleId: number;

  @IsNotEmpty()
  @IsNumber()
  applicationId: number;

  // @IsNotEmpty()
  // @IsNumber()
  // lovStatusId: number;
}

export class CreateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateDataPayloadDto)
  @IsArray()
  data: CreateDataPayloadDto[];
}
