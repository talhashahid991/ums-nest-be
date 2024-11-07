import { Module } from '@nestjs/common';
import { BusinessApplicationRoleService } from './business-application-role.service';
import { BusinessApplicationRoleController } from './business-application-role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessApplicationRole } from './entities/business-application-role.entity';
import { BusinessApplicationRoleHistory } from './entities/business-application-role-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BusinessApplicationRole,
      BusinessApplicationRoleHistory,
    ]),
  ],
  controllers: [BusinessApplicationRoleController],
  providers: [BusinessApplicationRoleService],
  exports: [BusinessApplicationRoleService],
})
export class BusinessApplicationRoleModule {}
