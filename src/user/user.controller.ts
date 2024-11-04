import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { addStandardParameters } from 'src/utils/commonFunctions';
import {
  API_NOT_FOUND_MESSAGE,
  API_SUCCESS_MESSAGE,
  LID_CREATED_ID,
} from 'src/utils/constants';
import { isEmpty } from 'lodash';
import * as dayjs from 'dayjs';
import { RestResponse } from 'src/utils/restResponse';
import { LoginDto } from './dto/login.dto';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { FindAllDto } from './dto/find-all.dto';
import { CreateDto } from './dto/create.dto';

@Controller('user')
export class UserController {
  constructor(private readonly mainService: UserService) {}

  @Post('register')
  async register(@Request() req: any, @Body() registerDto: RegisterDto) {
    try {
      const res = await Promise.all(
        registerDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(req.user, createPayload);
          return this.mainService.register({
            ...standardParams,
            dmlStatus: LID_CREATED_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );

      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, API_NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @Post('login')
  async login(@Request() req: any, @Body() loginDto: LoginDto) {
    try {
      const res = await Promise.all(
        loginDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(req.user, createPayload);
          return this.mainService.login({
            ...standardParams,
            dmlStatus: LID_CREATED_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );

      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, API_NOT_FOUND_MESSAGE);
      }
    } catch (e) {
      throw e;
    }
  }

  @UseGuards(JwtAuthGuard)
  // @UseGuards(
  //   RoleGuard(Role.FullPatientInsuranceAccess, Role.AddPatientInsurance),
  // )
  @Post('createUser')
  async createUser(@Request() req: any, @Body() createDto: CreateDto) {
    try {
      const res = await Promise.all(
        createDto?.data?.map((createPayload) => {
          const data = addStandardParameters(req.user, createPayload);
          return this.mainService.create({
            ...data,
            createdAt: dayjs().format(),
            dmlStatus: LID_CREATED_ID,
            dmlTimestamp: dayjs().format(),
          });
        }),
      );

      if (!isEmpty(res)) {
        return RestResponse.success(res, API_SUCCESS_MESSAGE);
      } else {
        return RestResponse.notFound(res, API_NOT_FOUND_MESSAGE);
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

  // @UseGuards(JwtAuthGuard)
  // // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.UpdateLovCategory))
  // @Post('update')
  // async update(@Request() req: any, @Body() updateDto: UpdateDto) {
  //   try {
  //     const res = await Promise.all(
  //       updateDto?.data?.map((updatePayload) => {
  //         const standardParams = addStandardParameters(req.user, updatePayload);
  //         return this.mainService.update({
  //           ...standardParams,
  //           dmlStatus: LID_UPDATE_ID,
  //           dmlTimestamps: dayjs().format(),
  //         });
  //       }),
  //     );
  //     if (!isEmpty(res)) {
  //       return RestResponse.success(res, API_SUCCESS_MESSAGE);
  //     } else {
  //       return RestResponse.notFound(res);
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  // @UseGuards(JwtAuthGuard)
  // // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.DeleteLovCategory))
  // @Post('delete')
  // async remove(@Request() req: any, @Body() deleteDto: DeleteDto) {
  //   try {
  //     const res = await Promise.all(
  //       deleteDto.data.map((findPayload) => {
  //         const standardParams = addStandardParameters(req.user, findPayload);
  //         return this.mainService.delete({
  //           ...standardParams,
  //           dmlStatus: LID_DELETE_ID,
  //           dmlTimestamps: dayjs().format(),
  //         });
  //       }),
  //     );
  //     if (!isEmpty(res)) {
  //       return RestResponse.success(res, API_SUCCESS_MESSAGE);
  //     } else {
  //       return RestResponse.notFound(res);
  //     }
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
