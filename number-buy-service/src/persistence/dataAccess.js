export class DataAccess {
  constructor({ persistenceManager }) {
    this.persistenceManager = persistenceManager
  }

  add(data) {
    const pool = this._pool()
    return this._execute(pool)(`INSERT INTO tbl_number SET ? `)(data)
  }

  async update(number, status = `CONSUMED`) {
    console.log(`Buying ${number}`)
    const pool = this._pool()
    const query = `UPDATE tbl_number SET status = '${status}' WHERE number = ${number};`
    this._execute(pool)(query)()
  }

  async getAvailable() {
    const pool = this._pool()
    return this._execute(pool)
      (`SELECT number FROM tbl_number WHERE status not in ("CONSUMED","QUARANTINED")`)
   ().then(results => {
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
 * 
 * CREATE SCHEMA `myrepublic` ;
 * 
 * 
 * 
 * CREATE  TABLE `myrepublic`.`tbl_number` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `number` VARCHAR(45) NULL ,
  `status` VARCHAR(45) NULL ,
  `added` DATETIME DEFAULT CURRENT_TIMESTAMP ,
  `lastUsed` DATETIME NULL ,
  PRIMARY KEY (`id`) );
 */