import { Module } from '@nestjs/common';
import { BusinessRoleService } from './business-role.service';
import { BusinessRoleController } from './business-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRole } from './entities/business-role.entity';
import { BusinessRoleHistory } from './entities/business-role-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessRole, BusinessRoleHistory])],
  controllers: [BusinessRoleController],
  providers: [BusinessRoleService],
})
export class BusinessRoleModule {}
