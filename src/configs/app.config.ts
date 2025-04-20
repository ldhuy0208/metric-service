import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appSchema = {
  REDIS_URL: Joi.string().required(),
};

export const appConfig = registerAs('app', () => ({
  redisUrl: process.env.REDIS_URL,
}));

@Injectable()
export class AppConfig {
  public readonly redisUrl: string;

  constructor(
    @Inject(appConfig.KEY)
    config: ConfigType<typeof appConfig>,
  ) {
    this.redisUrl = config.redisUrl!;
  }
}
