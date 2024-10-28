import { Test, TestingModule } from '@nestjs/testing';
import { LovCategoryController } from './lov-category.controller';
import { LovCategoryService } from './lov-category.service';

describe('LovCategoryController', () => {
  let controller: LovCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LovCategoryController],
      providers: [LovCategoryService],
    }).compile();

    controller = module.get<LovCategoryController>(LovCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
