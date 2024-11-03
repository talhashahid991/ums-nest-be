import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from './entities/user-history.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserLogModule } from 'src/user-log/user-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserHistory]),
    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_IN },
    }),
    UserLogModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
