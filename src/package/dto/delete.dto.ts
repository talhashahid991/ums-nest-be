import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class DeleteDataPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  packageId: number;
}

export class DeleteDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DeleteDataPayloadDto)
  @IsArray()
  data: DeleteDataPayloadDto[];
}
