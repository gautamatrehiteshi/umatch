import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from './entities/user.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
  exports: [UserService],
  imports: [UtilsModule, forwardRef(() => AuthModule), JwtModule],
})
export class UserModule {}
