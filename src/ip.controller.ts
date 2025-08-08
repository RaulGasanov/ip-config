import { Controller, Get, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Controller('ip')
export class IpController {
  @Get()
  getIp(@Req() request: FastifyRequest) {
    const ip =
      request.headers['x-forwarded-for']?.toString().split(',')[0] ||
      request.ip;
    return { ip };
  }
}
