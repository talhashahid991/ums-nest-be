import { Test, TestingModule } from '@nestjs/testing';
import { ListOfValuesService } from './list-of-values.service';

describe('ListOfValuesService', () => {
  let service: ListOfValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListOfValuesService],
    }).compile();

    service = module.get<ListOfValuesService>(ListOfValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
