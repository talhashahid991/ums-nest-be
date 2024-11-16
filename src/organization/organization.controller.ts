import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { CreateDto } from './dto/create.dto';
import { addStandardParameters } from 'src/utils/commonFunctions';
import {
  API_SUCCESS_MESSAGE,
  LID_CREATED_ID,
  LID_DELETE_ID,
  LID_UPDATE_ID,
} from 'src/utils/constants';
import { isEmpty } from 'lodash';
import * as dayjs from 'dayjs';
import { RestResponse } from 'src/utils/restResponse';
import { FindAllDto } from './dto/find-all.dto';
import { UpdateDto } from './dto/update.dto';
import { DeleteDto } from './dto/delete.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly mainService: OrganizationService) {}

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.AddLovCategory))
  @Post('create')
  async create(@Request() req: any, @Body() createDto: CreateDto) {
    try {
      const res = await Promise.all(
        createDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(req.user, createPayload);
          return this.mainService.create({
            ...standardParams,
            ownerId: standardParams.dmlUserId,
            dmlStatus: LID_CREATED_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );

      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  // // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.FindAllLovCategory))
  @Post('findAll')
  async findAll(@Request() req: any, @Body() findAllDto: FindAllDto) {
    try {
      const res = await Promise.all(
        findAllDto?.data?.map((findPayload) => {
          const standardParams = addStandardParameters(req.user, findPayload);
          return this.mainService.findAll(
            standardParams,
            findAllDto?.pagination,
          );
        }),
      );
      if (!isEmpty(res) && !isEmpty(res[0])) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.UpdateLovCategory))
  @Post('update')
  async update(@Request() req: any, @Body() updateDto: UpdateDto) {
    try {
      const res = await Promise.all(
        updateDto?.data?.map((updatePayload) => {
          const standardParams = addStandardParameters(req.user, updatePayload);
          return this.mainService.update({
            ...standardParams,
            dmlStatus: LID_UPDATE_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );
      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.DeleteLovCategory))
  @Post('delete')
  async remove(@Request() req: any, @Body() deleteDto: DeleteDto) {
    try {
      const res = await Promise.all(
        deleteDto.data.map((findPayload) => {
          const standardParams = addStandardParameters(req.user, findPayload);
          return this.mainService.delete({
            ...standardParams,
            dmlStatus: LID_DELETE_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );
      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res);
      }
    } catch (e) {
      throw e;
    }
  }
}
