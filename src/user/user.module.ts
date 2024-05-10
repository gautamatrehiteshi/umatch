import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './entities/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
})
export class UserModule {}
