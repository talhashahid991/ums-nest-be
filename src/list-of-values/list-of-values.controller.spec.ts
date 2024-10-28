import { Test, TestingModule } from '@nestjs/testing';
import { ListOfValuesController } from './list-of-values.controller';
import { ListOfValuesService } from './list-of-values.service';

describe('ListOfValuesController', () => {
  let controller: ListOfValuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListOfValuesController],
      providers: [ListOfValuesService],
    }).compile();

    controller = module.get<ListOfValuesController>(ListOfValuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
