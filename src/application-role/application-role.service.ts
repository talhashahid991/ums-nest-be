import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRole } from './entities/application-role.entity';
import { Not, Repository } from 'typeorm';
import { ApplicationRoleHistory } from './entities/application-role-history.entity';
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
import { FindAllLinkedUnlinkedDataPayloadDto } from './dto/find-all-linked-unlinked.dto';
import { UpdateDataPayloadDto } from './dto/update.dto';
import { DeleteDataPayloadDto } from './dto/delete.dto';

@Injectable()
export class ApplicationRoleService {
  constructor(
    @InjectRepository(ApplicationRole)
    private readonly mainRepository: Repository<ApplicationRole>,
    @InjectRepository(ApplicationRoleHistory)
    private readonly historyRepositry: Repository<ApplicationRoleHistory>,
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
    if (isNumber(params?.applicationRoleId)) {
      sql += `r.applicationRoleId=${params?.applicationRoleId} AND `;
    }
    if (!isEmpty(params?.title)) {
      sql += `r.title ilike '%${params?.title}%' AND `;
    }
    if (!isEmpty(params?.description)) {
      sql += `r.description ilike '%${params?.description}%' AND `;
    }
    if (!isEmpty(params?.applicationId)) {
      sql += `r.applicationId=${params?.applicationId} AND `;
    }
    if (!isEmpty(params?.lovStatusId)) {
      sql += `r.lovStatusId=${params?.lovStatusId} AND `;
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
          .leftJoinAndSelect('r.applicationId', 'applicationId')
          .getMany()
      : [];
    return count ? [query, count] : [];
  }

  async findOne(params: FindOneDataPayloadDto) {
    const res = await this.mainRepository.findOne({
      where: {
        applicationRoleId: params?.applicationRoleId,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });

    return res;
  }

  async findAllLinkedUnlinked(params: FindAllLinkedUnlinkedDataPayloadDto) {
    const allLinkedApplicationRoles = await this.mainRepository.query(
      `select ar.application_role_id, ar.title, bar.business_application_role_id, bar.application_role_id, bar.business_role_id, bar.dml_status 
      from application_role as ar 
      inner join business_application_role as bar on ar.application_role_id=bar.application_role_id 
      AND 
      bar.business_role_id=${params.businessRoleId} AND bar.dml_status!=${LID_DELETE_ID}`,
    );

    const allUnLinkedApplicationRoles = await this.mainRepository.query(
      `select ar.application_role_id, ar.title, bar.application_role_id as applicationRoleId, bar.business_role_id, bar.dml_status 
      from application_role as ar 
      left join business_application_role as bar on ar.application_role_id=bar.application_role_id 
      AND 
      bar.business_role_id=${params.businessRoleId} AND bar.dml_status!=${LID_DELETE_ID}
      where bar.application_role_id is Null`,
    );

    return [[allLinkedApplicationRoles, allUnLinkedApplicationRoles]];
  }

  async update(params: UpdateDataPayloadDto) {
    // check if record exists
    const ifRecordExists = await this.mainRepository.findOne({
      where: [
        {
          title: params.title,
          dmlStatus: Not(LID_DELETE_ID),
          applicationId: params.applicationId,
          applicationRoleId: Not(params.applicationRoleId),
        },
      ],
    });

    if (ifRecordExists) {
      return RestResponse.error(params, RECORD_EXISTS);
    }

    const obj = await this.findOne({
      applicationRoleId: params.applicationRoleId,
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
      applicationRoleId: params.applicationRoleId,
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
