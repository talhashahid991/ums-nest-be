import { PartialType } from '@nestjs/mapped-types';
import { CreateListOfValueDto } from './create-list-of-value.dto';

export class UpdateListOfValueDto extends PartialType(CreateListOfValueDto) {}
