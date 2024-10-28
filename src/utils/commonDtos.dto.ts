import { IsNumber, IsOptional } from 'class-validator';

export class paginationDto {
  @IsOptional()
  @IsNumber()
  pageNo?: number;

  @IsOptional()
  @IsNumber()
  itemsPerPage?: number;
}
