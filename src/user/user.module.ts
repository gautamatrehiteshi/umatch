import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './entities/user.entity';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
  imports: [UtilsModule],
})
export class UserModule {}
