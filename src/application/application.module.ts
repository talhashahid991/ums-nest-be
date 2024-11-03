import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationHistory } from './entities/application-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Application, ApplicationHistory])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}
