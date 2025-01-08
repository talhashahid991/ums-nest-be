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
  emailId: number;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  createdAt?: string;

  @IsOptional()
  @IsNumber()
  dmlUserId?: number;

  @IsOptional()
  @IsNumber()
  dmlStatus?: number;

  @IsOptional()
  @IsString()
  dmlTimestamp?: string;
}

export class UpdateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
