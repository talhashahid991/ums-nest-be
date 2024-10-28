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
}
