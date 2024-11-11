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

export class FindAllLinkedUnlinkedDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  businessRoleId?: number;

  @IsNotEmpty()
  @IsNumber()
  applicationId?: number;
}

export class FindAllLinkedUnlinkedDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindAllLinkedUnlinkedDataPayloadDto)
  @IsArray()
  data: FindAllLinkedUnlinkedDataPayloadDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => paginationDto)
  pagination: paginationDto;
}
