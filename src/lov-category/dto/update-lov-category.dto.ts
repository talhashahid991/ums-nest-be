import { PartialType } from '@nestjs/mapped-types';
import { CreateLovCategoryDto } from './create-lov-category.dto';

export class UpdateLovCategoryDto extends PartialType(CreateLovCategoryDto) {}
