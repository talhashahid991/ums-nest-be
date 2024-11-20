import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationRouteController } from './application-route.controller';
import { ApplicationRouteService } from './application-route.service';

describe('ApplicationRouteController', () => {
  let controller: ApplicationRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationRouteController],
      providers: [ApplicationRouteService],
    }).compile();

    controller = module.get<ApplicationRouteController>(ApplicationRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
