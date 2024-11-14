import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UpdateDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  organizationId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  ownerId?: number;

  @IsNotEmpty()
  @IsNumber()
  lovStatusId?: number;
}

export class UpdateDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateDataPayloadDto)
  @IsArray()
  data: UpdateDataPayloadDto[];
}
