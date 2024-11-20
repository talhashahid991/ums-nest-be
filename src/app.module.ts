import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListOfValuesModule } from './list-of-values/list-of-values.module';
import { LovCategoryModule } from './lov-category/lov-category.module';
import { UserLogModule } from './user-log/user-log.module';
import { ApplicationModule } from './application/application.module';
import * as dotenv from 'dotenv';
import { ApplicationRoleModule } from './application-role/application-role.module';
import { BusinessRoleModule } from './business-role/business-role.module';
import { BusinessApplicationRoleModule } from './business-application-role/business-application-role.module';
import { OrganizationModule } from './organization/organization.module';
import { ApplicationRouteModule } from './application-route/application-route.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    ListOfValuesModule,
    LovCategoryModule,
    UserLogModule,
    ApplicationModule,
    ApplicationRoleModule,
    BusinessRoleModule,
    BusinessApplicationRoleModule,
    OrganizationModule,
    ApplicationRouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
