import { Injectable } from '@nestjs/common';
import { CreateDataPayloadDto } from './dto/create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LovCategory } from './entities/lov-category.entity';
import { Not, Repository } from 'typeorm';
import { LovCategoryHistory } from './entities/lov-category-history.entity';
import {
  LID_DELETE_ID,
  RECORD_EXISTS,
  TRY_AGAIN_LATER,
} from 'src/utils/constants';
import { RestResponse } from 'src/utils/restResponse';
import { FindAllDataPayloadDto } from './dto/find-all.dto';
import { paginationDto } from 'src/utils/commonDtos.dto';
import { isEmpty, isNumber } from 'lodash';

@Injectable()
export class LovCategoryService {
  constructor(
    @InjectRepository(LovCategory)
    private readonly mainRepository: Repository<LovCategory>,
    @InjectRepository(LovCategoryHistory)
    private readonly historyRepositry: Repository<LovCategoryHistory>,
  ) {}

  async create(params: CreateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          title: params.title,
          dmlStatus: Not(LID_DELETE_ID),
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

  async findAll(params: FindAllDataPayloadDto, pagination: paginationDto) {
    let sql = '';
    // Construct SQL query based on provided filter parameters.
    if (isNumber(params?.lovCategoryId)) {
      sql += `r.lovCategoryId=${params?.lovCategoryId} AND `;
    }
    if (!isEmpty(params?.title)) {
      sql += `r.title ilike '%${params?.title}%' AND `;
    }
    if (!isEmpty(params?.description)) {
      sql += `r.description ilike '%${params?.description}%' AND `;
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

  // findAll() {
  //   return `This action returns all lovCategory`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} lovCategory`;
  // }

  // update(id: number, updateLovCategoryDto: UpdateLovCategoryDto) {
  //   return `This action updates a #${id} lovCategory`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} lovCategory`;
  // }
}
