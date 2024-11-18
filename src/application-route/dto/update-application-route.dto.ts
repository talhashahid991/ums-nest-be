import { PartialType } from '@nestjs/mapped-types';
import { CreateApplicationRouteDto } from './create-application-route.dto';

export class UpdateApplicationRouteDto extends PartialType(CreateApplicationRouteDto) {}
