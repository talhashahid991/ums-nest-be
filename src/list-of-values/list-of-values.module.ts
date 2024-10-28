import { Module } from '@nestjs/common';
import { ListOfValuesService } from './list-of-values.service';
import { ListOfValuesController } from './list-of-values.controller';

@Module({
  controllers: [ListOfValuesController],
  providers: [ListOfValuesService],
})
export class ListOfValuesModule {}
