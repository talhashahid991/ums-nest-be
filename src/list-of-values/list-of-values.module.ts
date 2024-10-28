import { Module } from '@nestjs/common';
import { ListOfValuesService } from './list-of-values.service';
import { ListOfValuesController } from './list-of-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // imports: [TypeOrmModule.forFeature([User, UserHistory])],
  controllers: [ListOfValuesController],
  providers: [ListOfValuesService],
})
export class ListOfValuesModule {}
