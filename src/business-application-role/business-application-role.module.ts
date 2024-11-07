import { Module } from '@nestjs/common';
import { BusinessRoleService } from './business-application-role.service';
import { BusinessRoleController } from './business-application-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRole } from './entities/business-application-role.entity';
import { BusinessRoleHistory } from './entities/business-application-role-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessRole, BusinessRoleHistory])],
  controllers: [BusinessRoleController],
  providers: [BusinessRoleService],
})
export class BusinessRoleModule {}
