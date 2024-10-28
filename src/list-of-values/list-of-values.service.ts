import { Injectable } from '@nestjs/common';
import { CreateListOfValueDto } from './dto/create-list-of-value.dto';
import { UpdateListOfValueDto } from './dto/update-list-of-value.dto';

@Injectable()
export class ListOfValuesService {
  create(createListOfValueDto: CreateListOfValueDto) {
    return 'This action adds a new listOfValue';
  }

  findAll() {
    return `This action returns all listOfValues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listOfValue`;
  }

  update(id: number, updateListOfValueDto: UpdateListOfValueDto) {
    return `This action updates a #${id} listOfValue`;
  }

  remove(id: number) {
    return `This action removes a #${id} listOfValue`;
  }
}
