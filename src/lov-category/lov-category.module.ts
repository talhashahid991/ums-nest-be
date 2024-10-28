import { Module } from '@nestjs/common';
import { LovCategoryService } from './lov-category.service';
import { LovCategoryController } from './lov-category.controller';

@Module({
  controllers: [LovCategoryController],
  providers: [LovCategoryService],
})
export class LovCategoryModule {}
