import { Injectable } from '@nestjs/common';
import { CreateLovCategoryDto } from './dto/create-lov-category.dto';
import { UpdateLovCategoryDto } from './dto/update-lov-category.dto';

@Injectable()
export class LovCategoryService {
  create(createLovCategoryDto: CreateLovCategoryDto) {
    return 'This action adds a new lovCategory';
  }

  findAll() {
    return `This action returns all lovCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lovCategory`;
  }

  update(id: number, updateLovCategoryDto: UpdateLovCategoryDto) {
    return `This action updates a #${id} lovCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} lovCategory`;
  }
}
