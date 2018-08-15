
export class DataAccess {
  constructor({ persistenceManager, redisConfig }) {
    this.persistenceManager = persistenceManager
    this.tblName = redisConfig.tblName
  }

  getRandom(count = 10) {
    return new Promise((resolve,reject) => {
      this._Client().sendCommand('SPOP', [this.tblName, count], (err, reply) => {
        if(err) reject(err)
        const data = reply.map(record => JSON.parse(record))
        resolve(data)
      });
    })
  }

  add(data) {
    console.log("adding data: ", data)
    return new Promise((resolve, reject) => {
      this._Client().sadd(this.tblName, JSON.stringify(data))
      resolve()
    })
  }

  _Client() {
    return this.persistenceManager.get()
  }
}