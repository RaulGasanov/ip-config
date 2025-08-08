import { Module } from '@nestjs/common';
import { IpController } from './ip.controller';
import { GeoService } from './geo.service';

@Module({
  imports: [],
  controllers: [IpController],
  providers: [GeoService],
})
export class AppModule {}
