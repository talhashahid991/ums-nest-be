import { Module } from '@nestjs/common';
import { ApplicationRouteService } from './application-route.service';
import { ApplicationRouteController } from './application-route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRoute } from './entities/application-route.entity';
import { ApplicationRouteHistory } from './entities/application-route-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRoute, ApplicationRouteHistory]),
  ],
  controllers: [ApplicationRouteController],
  providers: [ApplicationRouteService],
})
export class ApplicationRouteModule {}
