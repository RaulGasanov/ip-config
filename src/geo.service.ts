import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as geoip from 'geoip-lite';

@Injectable()
export class GeoService {
  private normalizeIp(ip: string) {
    if (ip?.startsWith('::ffff:')) return ip.slice(7);
    if (ip === '::1') return '127.0.0.1';
    return ip;
  }

  private isPrivate(ip: string) {
    return (
      ip === '127.0.0.1' ||
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)
    );
  }

  async getGeo(rawIp: string) {
    const ip = this.normalizeIp(rawIp);

    if (!ip || this.isPrivate(ip)) {
      return { ip, country: 'Local', city: 'Local', source: 'local' };
    }

    const offline = geoip.lookup(ip);
    if (offline) {
      return {
        ip,
        country: offline.country || 'Unknown',
        city: offline.city || 'Unknown',
        source: 'geoip-lite',
      };
    }

    try {
      const { data } = await axios.get(`https://ipwho.is/${ip}`, {
        timeout: 1500,
      });

      if (data?.success) {
        return {
          ip,
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          source: 'ipwho.is',
        };
      }

      return {
        ip,
        country: 'Unknown',
        city: 'Unknown',
        source: 'ipwho.is:fail',
      };
    } catch (e) {
      return {
        ip,
        country: 'Unknown',
        city: 'Unknown',
        source: 'ipwho.is:error',
      };
    }
  }
}
