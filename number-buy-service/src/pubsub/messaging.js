import redis from 'redis'

export class Messaging {
  constructor({ redisConfig }) {
    this.pub = redis.createClient({ password: redisConfig.auth });
    this.pub.on("connect", this.listener);
    this.pub.on('error', this.listener)
  }

  publish(channel = 'transaction-history-channel', message) {
    return new Promise((resolve,reject) => {
      try {
        this.pub.publish(channel, JSON.stringify(message))
        resolve()
      } catch(err) {
        reject(err)
      }
    })
    
  }

  listener(message) {
    console.log('redis publisher', message)
  }
}

