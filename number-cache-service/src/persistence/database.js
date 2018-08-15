import redis from 'redis'

export class Database {
  constructor({ redisConfig }) {
    this.client = redis.createClient({ password: redisConfig.auth });
    this.client.on("connect", this.listener);
    this.client.on('error', this.listener)
  }

  listener(message) {
    console.log("Redis status ", message || '')
  }

  get() {
    return this.client;
  }
}