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
import { FindAllDataPayloadDto } from './dto/find-all.dto';
import { paginationDto } from 'src/utils/commonDtos.dto';
import { isEmpty, isNumber } from 'lodash';
import { UpdateDataPayloadDto } from './dto/update.dto';
import { FindOneDataPayloadDto } from './dto/find-one.dto';
import { DeleteDataPayloadDto } from './dto/delete.dto';

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
    await this.historyRepositry.save({ ...res });
    if (res) {
      return [res];
    } else {
      // If creation fails, throw a BadRequestException.
      return RestResponse.error(params, TRY_AGAIN_LATER);
    }
  }

  async findAll(params: FindAllDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    // Construct SQL query based on provided filter parameters.
    if (isNumber(params?.listOfValuesId)) {
      sql += `r.listOfValuesId=${params?.listOfValuesId} AND `;
    }
    if (!isEmpty(params?.title)) {
      sql += `r.title ilike '%${params?.title}%' AND `;
    }
    if (!isEmpty(params?.description)) {
      sql += `r.description ilike '%${params?.description}%' AND `;
    }
    if (!isEmpty(params?.lovCategoryId)) {
      sql += `r.lovCategoryId=${params?.lovCategoryId} AND `;
    }
    if (!isEmpty(params?.lovStatusId)) {
      sql += `r.lovStatusId=${params?.lovStatusId} AND `;
    }
    if (!isEmpty(params?.sequenceNo)) {
      sql += `r.sequenceNo=${params?.sequenceNo} AND `;
    }
    if (!isEmpty(params?.cssClasses)) {
      sql += `r.cssClasses ilike '%${params?.cssClasses}%' AND `;
    }
    if (!isEmpty(params?.cssSeverity)) {
      sql += `r.cssSeverity ilike '%${params?.cssSeverity}%' AND `;
    }

    sql += `r.dmlStatus != ${LID_DELETE_ID} ORDER BY 1 DESC`;

    // Count the total number of records based on the constructed SQL query.
    const count = await this.mainRepository
      .createQueryBuilder('r')
      .where(sql)
      .getCount();
    // Apply pagination if provided and return the filtered and paginated records.
    if (
      !isEmpty(pagination) &&
      pagination?.pageNo >= 0 &&
      pagination?.itemsPerPage > 0
    ) {
      sql += ` OFFSET ${
        pagination?.pageNo * pagination?.itemsPerPage
      } ROWS FETCH NEXT ${pagination?.itemsPerPage} ROWS ONLY`;
    }

    const query = count
      ? await this.mainRepository.createQueryBuilder('r').where(sql).getMany()
      : [];
    return count ? [query, count] : [];
  }

  async findOne(params: FindOneDataPayloadDto) {
    const res = await this.mainRepository.findOne({
      where: {
        listOfValuesId: params?.listOfValuesId,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });

    return res;
  }

  async update(params: UpdateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          title: params.title,
          dmlStatus: Not(LID_DELETE_ID),
          lovCategoryId: params.lovCategoryId,
          listOfValuesId: Not(params.listOfValuesId),
        },
      ],
    });

    if (ifRecordExists) {
      return RestResponse.error(params, RECORD_EXISTS);
    }

    const obj = await this.findOne({
      listOfValuesId: params.listOfValuesId,
    });

    // If the record to update does not exist, throw a NotFoundException.
    if (!obj) {
      return RestResponse.notFound(params);
    }

    const res = await this.mainRepository.save({
      ...params,
    });
    await this.historyRepositry.save({ ...res });
    if (!res) {
      return [res];
    } else {
      // If creation fails, throw a BadRequestException.
      return RestResponse.error(params, TRY_AGAIN_LATER);
    }
  }

  async delete(params: DeleteDataPayloadDto) {
    const obj = await this.findOne({
      listOfValuesId: params.listOfValuesId,
    });

    // If the record to update does not exist, throw a NotFoundException.
    if (!obj) {
      return RestResponse.notFound(params);
    }
    obj.dmlStatus = params['dmlStatus'];
    obj.dmlTimestamp = params['dmlTimestamp'];
    const res = await this.mainRepository.save({
      ...obj,
    });
    await this.historyRepositry.save({ ...res });
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
