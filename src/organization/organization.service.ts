import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Not, Repository } from 'typeorm';
import { OrganizationHistory } from './entities/organization-history.entity';
import { CreateDataPayloadDto } from './dto/create.dto';
import {
  LID_DELETE_ID,
  RECORD_EXISTS,
  TRY_AGAIN_LATER,
} from 'src/utils/constants';
import { RestResponse } from 'src/utils/restResponse';
import { FindAllDataPayloadDto } from './dto/find-all.dto';
import { paginationDto } from 'src/utils/commonDtos.dto';
import { isEmpty, isNumber } from 'lodash';
import { FindOneDataPayloadDto } from './dto/find-one.dto';
import { UpdateDataPayloadDto } from './dto/update.dto';
import { DeleteDataPayloadDto } from './dto/delete.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly mainRepository: Repository<Organization>,
    @InjectRepository(OrganizationHistory)
    private readonly historyRepositry: Repository<OrganizationHistory>,
  ) {}

  async create(params: CreateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          title: params.title,
          ownerId: params.ownerId,
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
    if (isNumber(params?.organizationId)) {
      sql += `r.organizationId=${params?.organizationId} AND `;
    }
    if (!isEmpty(params?.title)) {
      sql += `r.title ilike '%${params?.title}%' AND `;
    }
    if (!isEmpty(params?.description)) {
      sql += `r.description ilike '%${params?.description}%' AND `;
    }
    if (isNumber(params?.ownerId)) {
      sql += `r.ownerId=${params?.ownerId} AND `;
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
      ? await this.mainRepository
          .createQueryBuilder('r')
          .where(sql)
          .leftJoinAndSelect('r.lovStatusId', 'lovStatusId')
          .leftJoinAndSelect('r.ownerId', 'ownerId')
          .getMany()
      : [];
    return count ? [query, count] : [];
  }

  async findOne(params: FindOneDataPayloadDto) {
    const res = await this.mainRepository.findOne({
      where: {
        organizationId: params?.organizationId,
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
          ownerId: params.ownerId,
          dmlStatus: Not(LID_DELETE_ID),
          organizationId: Not(params.organizationId),
        },
      ],
    });

    if (ifRecordExists) {
      return RestResponse.error(params, RECORD_EXISTS);
    }

    const obj = await this.findOne({
      organizationId: params.organizationId,
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
      organizationId: params.organizationId,
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
}
