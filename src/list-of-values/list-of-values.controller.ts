import { CreateDto } from './dto/create.dto';
import { Controller, Post, Body, Request } from '@nestjs/common';
import { ListOfValuesService } from './list-of-values.service';
import { addStandardParameters } from 'src/utils/commonFunctions';
import {
  API_NOT_FOUND_MESSAGE,
  API_SUCCESS_MESSAGE,
  LID_CREATED_ID,
} from 'src/utils/constants';
import { isEmpty } from 'lodash';
import * as dayjs from 'dayjs';
import { RestResponse } from 'src/utils/restResponse';

@Controller('list-of-values')
export class ListOfValuesController {
  constructor(private readonly mainService: ListOfValuesService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(RoleGuard(Role.FullLovCategoryAccess, Role.AddLovCategory))
  @Post('create')
  async create(@Request() req: any, @Body() createDto: CreateDto) {
    try {
      const res = await Promise.all(
        createDto?.data?.map((createPayload) => {
          const standardParams = addStandardParameters(req.user, createPayload);
          return this.mainService.create({
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

  // @Get()
  // findAll() {
  //   return this.listOfValuesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.listOfValuesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateListOfValueDto: UpdateListOfValueDto) {
  //   return this.listOfValuesService.update(+id, updateListOfValueDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.listOfValuesService.remove(+id);
  // }
}
