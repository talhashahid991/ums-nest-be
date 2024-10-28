import { Injectable } from '@nestjs/common';
import { CreateDataPayloadDto } from './dto/create.dto';
import { ListOfValues } from './entities/list-of-values.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { ListOfValuesHistory } from './entities/list-of-values-history.entity';
import {
  LID_DELETE_ID,
  RECORD_EXISTS,
  TRY_AGAIN_LATER,
} from 'src/utils/constants';
import { RestResponse } from 'src/utils/restResponse';

@Injectable()
export class ListOfValuesService {
  constructor(
    @InjectRepository(ListOfValues)
    private readonly mainRepository: Repository<ListOfValues>,
    @InjectRepository(ListOfValuesHistory)
    private readonly historyRepositry: Repository<ListOfValuesHistory>,
  ) {}

  async create(params: CreateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          title: params.title,
          dmlStatus: Not(LID_DELETE_ID),
          lovCategoryId: params.lovCategoryId,
        },
      ],
    });
    if (ifRecordExists) {
      return RestResponse.notFound(params, RECORD_EXISTS);
    }
    // create a new record
    const res = await this.mainRepository.save({ ...params });
    // create history record
    await this.historyRepositry.save({ ...params });
    if (res) {
      return [res];
    } else {
      // If creation fails, throw a BadRequestException.
      return RestResponse.error(params, TRY_AGAIN_LATER);
    }
  }

  // findAll() {
  //   return `This action returns all listOfValues`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} listOfValue`;
  // }

  // update(id: number, updateListOfValueDto: UpdateListOfValueDto) {
  //   return `This action updates a #${id} listOfValue`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} listOfValue`;
  // }
}
