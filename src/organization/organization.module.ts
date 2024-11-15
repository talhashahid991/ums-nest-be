import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { OrganizationHistory } from './entities/organization-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization, OrganizationHistory])],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
