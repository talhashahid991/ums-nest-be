import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListOfValuesService } from './list-of-values.service';
import { CreateListOfValueDto } from './dto/create-list-of-value.dto';
import { UpdateListOfValueDto } from './dto/update-list-of-value.dto';

@Controller('list-of-values')
export class ListOfValuesController {
  constructor(private readonly listOfValuesService: ListOfValuesService) {}

  @Post()
  create(@Body() createListOfValueDto: CreateListOfValueDto) {
    return this.listOfValuesService.create(createListOfValueDto);
  }

  @Get()
  findAll() {
    return this.listOfValuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listOfValuesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateListOfValueDto: UpdateListOfValueDto) {
    return this.listOfValuesService.update(+id, updateListOfValueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listOfValuesService.remove(+id);
  }
}
