import { Module } from '@nestjs/common';
import { BusinessRoleService } from './business-role.service';
import { BusinessRoleController } from './business-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRole } from './entities/business-role.entity';
import { BusinessRoleHistory } from './entities/business-role-history.entity';
import { ApplicationRoleModule } from 'src/application-role/application-role.module';
import { BusinessApplicationRoleModule } from 'src/business-application-role/business-application-role.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusinessRole, BusinessRoleHistory]),
    ApplicationRoleModule,
    BusinessApplicationRoleModule,
  ],
  controllers: [BusinessRoleController],
  providers: [BusinessRoleService],
})
export class BusinessRoleModule {}
