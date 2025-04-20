import { AppConfig } from '@configs/app.config';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor(private readonly appConfig: AppConfig) {
    this.redisClient = new Redis(this.appConfig.redisUrl);
  }

  async setMultiple(items: { key: string; value: any }[]): Promise<void> {
    let objValue = {};
    items.map((item) => {
      objValue = Object.assign(objValue, {
        [item.key]: item.value ? JSON.stringify(item.value) : '',
      });
    });
    await this.redisClient.mset(objValue);
  }

  //default expires is 1 day = 86,400
  async setEx(key: string, value: any, expiresIn = 86400): Promise<void> {
    await this.redisClient.setex(key, expiresIn, JSON.stringify(value));
  }
  async set(key: string, value: any): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value));
  }

  async remove(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async removeKeys(keys: string): Promise<void> {
    await this.redisClient.del(...keys);
  }

//   async get<T>(key: string): Promise<T | null> {
//     const value = await this.redisClient.get(key);
//     return value ? (this.isValidJSON(value) ? JSON.parse(value) : value) : null;
//   }

  // Hashes
  async hSet(key: string, object: object) {
    return await this.redisClient.hset(key, object);
  }

  async hGet(key: string, field: string | Buffer) {
    return await this.redisClient.hget(key, field);
  }

  async hmGet(key: string, fields: (string | Buffer)[]) {
    return await this.redisClient.hmget(key, ...fields);
  }

  async hGetAll(key: string) {
    return await this.redisClient.hgetall(key);
  }

  async hIncrBy(
    key: string,
    field: string | Buffer,
    increment: string | number,
  ) {
    return await this.redisClient.hincrby(key, field, increment);
  }

  // Sets
  async sAdd(key: string, members: (string | number | Buffer)[]) {
    return await this.redisClient.sadd(key, members);
  }

  async sMembers(key: string) {
    return await this.redisClient.smembers(key);
  }

  async sRem(key: string, members: (string | number | Buffer)[]) {
    return await this.redisClient.srem(key, members);
  }

  async sIsMember(key: string, member: string | number | Buffer) {
    return await this.redisClient.sismember(key, member);
  }

  async sCard(key: string) {
    return await this.redisClient.scard(key);
  }

  // Sorted Sets
  async zAdd(key: string, scoreMembers: (string | Buffer | number)[]) {
    return await this.redisClient.zadd(key, ...scoreMembers);
  }

  async zRem(key: string, scoreMembers: (string | Buffer | number)[]) {
    return await this.redisClient.zrem(key, ...scoreMembers);
  }

  async zIncrBy(
    key: string,
    increment: number | string,
    member: string | Buffer | number,
  ) {
    return await this.redisClient.zincrby(key, increment, member);
  }

  async zRange(
    key: string,
    min: string | Buffer | number,
    max: string | Buffer | number,
    withscores: 'WITHSCORES',
  ) {
    return await this.redisClient.zrange(key, min, max, withscores);
  }

  async zRangeByScore(
    key: string,
    start: number | string,
    stop: number | string,
    withscores: 'WITHSCORES',
  ) {
    return await this.redisClient.zrangebyscore(key, start, stop, withscores);
  }

  async zRevRange(
    key: string,
    start: number | string,
    stop: number | string,
    withscores: 'WITHSCORES',
  ) {
    return await this.redisClient.zrevrange(key, start, stop, withscores);
  }

  async zRank(key: string, member: string | Buffer | number) {
    return await this.redisClient.zrank(key, member);
  }

  async zRevRank(key: string, member: string | Buffer | number) {
    return await this.redisClient.zrevrank(key, member);
  }

  // Lists
  async lPush(key: string, elements: (string | number | Buffer)[]) {
    return await this.redisClient.lpush(key, ...elements);
  }

  async lPop(key: string) {
    return await this.redisClient.lpop(key);
  }

  async lLen(key: string) {
    return await this.redisClient.llen(key);
  }

  async lMove(
    source: string,
    destination: string,
    left: 'LEFT',
    left1: 'LEFT',
  ) {
    return await this.redisClient.lmove(source, destination, left, left1);
  }

  async lTrim(key: string, start: number | string, stop: number | string) {
    return await this.redisClient.ltrim(key, start, stop);
  }

  isValidJSON(value: any): boolean {
    if (typeof value !== 'string') {
      return false; // Value is not a string, so it can't be valid JSON
    }

    try {
      JSON.parse(value);
      return true; // Parsing succeeded, so it's valid JSON
    } catch (error) {
      return false; // Parsing failed, so it's not valid JSON
    }
  }
}
