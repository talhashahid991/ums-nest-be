import { Module } from '@nestjs/common';
import { LovCategoryService } from './lov-category.service';
import { LovCategoryController } from './lov-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LovCategory } from './entities/lov-category.entity';
import { LovCategoryHistory } from './entities/lov-category-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LovCategory, LovCategoryHistory])],
  controllers: [LovCategoryController],
  providers: [LovCategoryService],
})
export class LovCategoryModule {}
