import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';

export class FindOneDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  organizationId: number;
}

export class FindOneDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDataPayloadDto)
  @IsArray()
  data: FindOneDataPayloadDto[];
}
