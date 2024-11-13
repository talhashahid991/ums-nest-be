import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessRole } from './entities/business-role.entity';
import { Not, Repository } from 'typeorm';
import { BusinessRoleHistory } from './entities/business-role-history.entity';
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
import { ApplicationRoleService } from 'src/application-role/application-role.service';
import { BusinessApplicationRoleService } from 'src/business-application-role/business-application-role.service';
import { application } from 'express';

@Injectable()
export class BusinessRoleService {
  constructor(
    @InjectRepository(BusinessRole)
    private readonly mainRepository: Repository<BusinessRole>,
    @InjectRepository(BusinessRoleHistory)
    private readonly historyRepositry: Repository<BusinessRoleHistory>,
    private applicationRoleService: ApplicationRoleService,
    private businessApplicationRoleService: BusinessApplicationRoleService,
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
    if (isNumber(params?.businessRoleId)) {
      sql += `r.businessRoleId=${params?.businessRoleId} AND `;
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

  // async findAllLinkedUnlinked(
  //   params: FindAllLinkedUnlinkedDataPayloadDto,
  //   pagination: paginationDto,
  // ) {
  //   // find all applicationRoles from ApplicationRoles for given applicationId
  //   let allApplicationRoles: any = await this.applicationRoleService.findAll(
  //     { applicationId: params?.applicationId },
  //     {},
  //   );
  //   allApplicationRoles = allApplicationRoles[0];
  //   // find linked applicationRoles from BusinessApplicationRoles for given businessRoleId
  //   let linkedApplicationRolesObjects: any =
  //     await this.businessApplicationRoleService.findAllApplicationRoles({
  //       businessRoleId: params.businessRoleId,
  //     });
  //   let unlinkedApplicationRoles = [];
  //   let linkedApplicationRoles = [];
  //   if (linkedApplicationRolesObjects.length) {
  //     linkedApplicationRolesObjects = linkedApplicationRolesObjects[0];
  //     // find unlinked applicationRoles by subtracting linkedApplicationRoles from allApplicationRoles
  //     for (let applicationRole of allApplicationRoles) {
  //       let isLinked: boolean = false;
  //       for (let role of linkedApplicationRolesObjects) {
  //         if (
  //           applicationRole.applicationRoleId ===
  //           role.applicationRoleId.applicationRoleId
  //         ) {
  //           isLinked = true;
  //         }
  //       }
  //       if (isLinked) {
  //         linkedApplicationRoles.push(applicationRole);
  //       } else {
  //         unlinkedApplicationRoles.push(applicationRole);
  //       }
  //     }
  //   } else {
  //     unlinkedApplicationRoles = allApplicationRoles;
  //   }
  //   return [[linkedApplicationRoles, unlinkedApplicationRoles]];
  // }

  async findOne(params: FindOneDataPayloadDto) {
    const res = await this.mainRepository.findOne({
      where: {
        businessRoleId: params?.businessRoleId,
        dmlStatus: Not(LID_DELETE_ID),
      },
    });

    return res;
  }

  // async update(params: UpdateDataPayloadDto) {
  //   // check if record exists
  //   const ifRecordExists = await this.mainRepository.findOne({
  //     where: [
  //       {
  //         title: params.title,
  //         dmlStatus: Not(LID_DELETE_ID),
  //         lovCategoryId: params.lovCategoryId,
  //         listOfValuesId: Not(params.listOfValuesId),
  //       },
  //     ],
  //   });

  //   if (ifRecordExists) {
  //     return RestResponse.error(params, RECORD_EXISTS);
  //   }

  //   const obj = await this.findOne({
  //     listOfValuesId: params.listOfValuesId,
  //   });

  //   // If the record to update does not exist, throw a NotFoundException.
  //   if (!obj) {
  //     return RestResponse.notFound(params);
  //   }

  //   const res = await this.mainRepository.save({
  //     ...params,
  //   });
  //   await this.historyRepositry.save({ ...res });
  //   if (!res) {
  //     return [res];
  //   } else {
  //     // If creation fails, throw a BadRequestException.
  //     return RestResponse.error(params, TRY_AGAIN_LATER);
  //   }
  // }

  // async delete(params: DeleteDataPayloadDto) {
  //   const obj = await this.findOne({
  //     listOfValuesId: params.listOfValuesId,
  //   });

  //   // If the record to update does not exist, throw a NotFoundException.
  //   if (!obj) {
  //     return RestResponse.notFound(params);
  //   }
  //   obj.dmlStatus = params['dmlStatus'];
  //   obj.dmlTimestamp = params['dmlTimestamp'];
  //   const res = await this.mainRepository.save({
  //     ...obj,
  //   });
  //   await this.historyRepositry.save({ ...res });
  //   if (res) {
  //     return [res];
  //   } else {
  //     // If creation fails, throw a BadRequestException.
  //     return RestResponse.error(params, TRY_AGAIN_LATER);
  //   }
  // }
}
