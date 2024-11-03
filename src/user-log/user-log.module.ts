import { Module } from '@nestjs/common';
import { UserLogService } from './user-log.service';
import { UserLogController } from './user-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLog } from './entities/user-log.entity';
import { UserLogHistory } from './entities/user-log-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserLog, UserLogHistory])],
  controllers: [UserLogController],
  providers: [UserLogService],
  exports: [UserLogService],
})
export class UserLogModule {}
