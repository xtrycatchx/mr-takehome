import mysql from 'mysql'

export class Database {
  constructor({mysqlConfig}) {
    console.log('instantiating DB client using:', mysqlConfig)
    this.pool = this.connect(mysqlConfig)
    if(!this.pool) {
      console.error('Problem getting a connection:', pool)
    }
  }

  connect(mysqlConfig) {
    return mysql.createPool(mysqlConfig)
  }

  getPool() {
    if (this.pool) {
      return this.pool
    } else {
      return this.connect(mysqlConfig);
    }
  }
}

