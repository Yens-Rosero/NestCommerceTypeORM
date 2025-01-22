import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientePg: Client,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  async getTasks() {
    const res = await this.clientePg.query('SELECT * FROM tasks');
    return res.rows;
  }
}
