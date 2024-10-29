import { Module } from '@nestjs/common';
import { ListOfValuesService } from './list-of-values.service';
import { ListOfValuesController } from './list-of-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListOfValues } from './entities/list-of-values.entity';
import { ListOfValuesHistory } from './entities/list-of-values-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ListOfValues, ListOfValuesHistory])],
  controllers: [ListOfValuesController],
  providers: [ListOfValuesService],
})
export class ListOfValuesModule {}
