import { Module } from '@nestjs/common';
import { ApplicationRouteService } from './application-route.service';
import { ApplicationRouteController } from './application-route.controller';

@Module({
  controllers: [ApplicationRouteController],
  providers: [ApplicationRouteService],
})
export class ApplicationRouteModule {}
