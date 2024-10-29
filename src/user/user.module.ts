import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHistory } from './entities/user-history.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserHistory]),
    JwtModule.register({
      secret: process.env.JWT_CONSTANT,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_IN },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
