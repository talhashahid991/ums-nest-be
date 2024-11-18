import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationRouteService } from './application-route.service';
import { CreateApplicationRouteDto } from './dto/create-application-route.dto';
import { UpdateApplicationRouteDto } from './dto/update-application-route.dto';

@Controller('application-route')
export class ApplicationRouteController {
  constructor(private readonly applicationRouteService: ApplicationRouteService) {}

  @Post()
  create(@Body() createApplicationRouteDto: CreateApplicationRouteDto) {
    return this.applicationRouteService.create(createApplicationRouteDto);
  }

  @Get()
  findAll() {
    return this.applicationRouteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationRouteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationRouteDto: UpdateApplicationRouteDto) {
    return this.applicationRouteService.update(+id, updateApplicationRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationRouteService.remove(+id);
  }
}
