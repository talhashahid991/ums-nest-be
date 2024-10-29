import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { paginationDto } from 'src/utils/commonDtos.dto';

export class FindOneDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  applicationRoleId: number;
}

export class FindOneDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDataPayloadDto)
  @IsArray()
  data: FindOneDataPayloadDto[];
}
