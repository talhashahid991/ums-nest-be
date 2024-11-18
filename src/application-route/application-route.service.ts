import { Injectable } from '@nestjs/common';
import { CreateApplicationRouteDto } from './dto/create-application-route.dto';
import { UpdateApplicationRouteDto } from './dto/update-application-route.dto';

@Injectable()
export class ApplicationRouteService {
  create(createApplicationRouteDto: CreateApplicationRouteDto) {
    return 'This action adds a new applicationRoute';
  }

  findAll() {
    return `This action returns all applicationRoute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationRoute`;
  }

  update(id: number, updateApplicationRouteDto: UpdateApplicationRouteDto) {
    return `This action updates a #${id} applicationRoute`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationRoute`;
  }
}
