import redis from 'redis'

export class Messaging {
  constructor({ redisConfig, dataAccess }) {
    this.sub = redis.createClient({ password: redisConfig.auth });
    this.sub.on("connect", this.listener);
    this.sub.on('error', this.listener)
    this.dataAccess = dataAccess
    this.sub.on('message', (channel, message) => {
      try {
        const data = JSON.parse(message)
        console.log("received: ",channel, data)
        const transaction = {
          number_id: data.number,
          transaction_type: data.transaction
        }
        dataAccess.logTransaction(transaction)
      } catch (e) {
        console.error("Error processing subscribed data", e)
      }
    })
  }

  subscribe(channel = 'transaction-history-channel') {
    this.sub.subscribe(channel)
  }

  listener(message) {
    console.log('redis subscriber', message || '')
  }
}

