import { Module } from '@nestjs/common';
import { IpController } from './ip.controller';

@Module({
  imports: [],
  controllers: [IpController],
  providers: [],
})
export class AppModule {}
