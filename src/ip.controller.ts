import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import * as geoip from 'geoip-lite';

@Controller('ip')
export class IpController {
  @Get()
  getIp(@Req() request: FastifyRequest) {
    const ip =
      request.headers['x-forwarded-for']?.toString().split(',')[0] ||
      request.ip;

    const geo = geoip.lookup(ip);

    return {
      ip,
      country: geo?.country || 'Unknown',
      city: geo?.city || 'Unknown',
    };
  }
}
