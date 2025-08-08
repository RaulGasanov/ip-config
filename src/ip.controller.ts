import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { GeoService } from './geo.service';

@Controller('ip')
export class IpController {
  constructor(private readonly geoService: GeoService) {}

  @Get()
  async getIp(@Req() request: FastifyRequest) {
    const ip =
      request.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
      request.ip;
    return this.geoService.getGeo(ip);
  }
}
