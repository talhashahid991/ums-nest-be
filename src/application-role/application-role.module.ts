import { Module } from '@nestjs/common';
import { ApplicationRoleService } from './application-role.service';
import { ApplicationRoleController } from './application-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationRole } from './entities/application-role.entity';
import { ApplicationRoleHistory } from './entities/application-role-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationRole, ApplicationRoleHistory]),
  ],
  controllers: [ApplicationRoleController],
  providers: [ApplicationRoleService],
  exports: [ApplicationRoleService],
})
export class ApplicationRoleModule {}
