import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { OtpProviders } from './entity/otp.entity';

@Module({
  providers: [UtilsService, ...OtpProviders],
  exports: [UtilsService],
})
export class UtilsModule {}
