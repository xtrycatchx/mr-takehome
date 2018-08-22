export class DataAccess {
  constructor({ persistenceManager }) {
    this.persistenceManager = persistenceManager
  }

  async logTransaction(transaction) {
    const pool = this._pool()
    const data = await this._execute(pool)(`INSERT INTO tbl_history SET ? `)(transaction)
    return data
  }

  async getHistoryBetweenDates() {
    const pool = this._pool()
    return this._execute(pool)
      (`SELECT id, time_stamp, number_id, transaction_type FROM tbl_history`)
      ().then(results => {
        if (results && results.length > 0) {
          return Promise.resolve(results)
        } else {
          return Promise.resolve({})
        }
      })
  }

  async getHistoryOfANumber(number_id) {
    const pool = this._pool()
    return this._execute(pool)
      (`SELECT id, time_stamp, number_id, transaction_type FROM tbl_history where number_id = ?`)
      ([number_id]).then(results => {
        if (results && results.length > 0) {
          return Promise.resolve(results)
        } else {
          return Promise.resolve({})
        }
      })
  }

  _pool() {
    return this.persistenceManager.getPool()
  }

  _execute(pool) {
    return (queryString) => {
      return (params) => {
        return new Promise((resolve, reject) => {
          pool.query(queryString, params, (error, results, fields) => {
            if (error) {
              console.log('Error', queryString, params)
              reject(error);
            } else {
              console.log('OK', queryString, params)
              resolve(results)
            }
          });
        })
      };
    };
  }
}

/**

CREATE  TABLE `numbers_db`.`tbl_history` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `time_stamp` DEFAULT CURRENT_TIMESTAMP ,
  `number_id` INT NOT NULL ,
  `transaction_type` VARCHAR(45) NULL ,
  PRIMARY KEY (`id`) );
 */