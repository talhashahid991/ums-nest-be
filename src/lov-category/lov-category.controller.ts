import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LovCategoryService } from './lov-category.service';
import { CreateLovCategoryDto } from './dto/create-lov-category.dto';
import { UpdateLovCategoryDto } from './dto/update-lov-category.dto';

@Controller('lov-category')
export class LovCategoryController {
  constructor(private readonly lovCategoryService: LovCategoryService) {}

  @Post()
  create(@Body() createLovCategoryDto: CreateLovCategoryDto) {
    return this.lovCategoryService.create(createLovCategoryDto);
  }

  @Get()
  findAll() {
    return this.lovCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lovCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLovCategoryDto: UpdateLovCategoryDto) {
    return this.lovCategoryService.update(+id, updateLovCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lovCategoryService.remove(+id);
  }
}
