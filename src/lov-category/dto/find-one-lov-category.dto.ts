// import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { metaDataDto } from 'src/utils/commonDtos.dto';

export class FindOneDataPayloadDto {
  @IsNumber()
  lovCategoryId: number;
}

export class FindOneLovCategoryDto extends metaDataDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => FindOneDataPayloadDto)
  @IsArray()
  data: FindOneDataPayloadDto[];
}
