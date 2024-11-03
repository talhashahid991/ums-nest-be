import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateDataPayloadDto } from './dto/create.dto';
import { Repository } from 'typeorm';
import { UserLog } from './entities/user-log.entity';
import { UserLogHistory } from './entities/user-log-history.entity';
import { RestResponse } from 'src/utils/restResponse';

@Injectable()
export class UserLogService {
  constructor(
    @InjectRepository(UserLog)
    private readonly mainRepository: Repository<UserLog>,
    @InjectRepository(UserLogHistory)
    private readonly historyRepositry: Repository<UserLogHistory>,
  ) {}
  async create(params: CreateDataPayloadDto) {
    const res = await this.mainRepository.save(params);
    await this.historyRepositry.save(res);
    if (res) {
      return [res];
    } else {
      // If creation fails, throw an error.
      return RestResponse.error('Please try again later');
    }
  }

  // findAll() {
  //   return `This action returns all userLog`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} userLog`;
  // }

  // update(id: number, updateUserLogDto: UpdateUserLogDto) {
  //   return `This action updates a #${id} userLog`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} userLog`;
  // }
}
