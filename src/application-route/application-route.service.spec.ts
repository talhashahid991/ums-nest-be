import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationRouteService } from './application-route.service';

describe('ApplicationRouteService', () => {
  let service: ApplicationRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationRouteService],
    }).compile();

    service = module.get<ApplicationRouteService>(ApplicationRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
