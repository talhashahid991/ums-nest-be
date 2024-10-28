import { Test, TestingModule } from '@nestjs/testing';
import { LovCategoryService } from './lov-category.service';

describe('LovCategoryService', () => {
  let service: LovCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LovCategoryService],
    }).compile();

    service = module.get<LovCategoryService>(LovCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
