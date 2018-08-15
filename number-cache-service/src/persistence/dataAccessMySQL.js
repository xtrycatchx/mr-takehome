export class DataAccess {
  constructor({ persistenceManager }) {
    this.persistenceManager = persistenceManager
  }

  add(data) {
    const pool = this._pool()
    return this._execute(pool)(`INSERT INTO tbl_number SET ? `)(data)
  }

  async updateStatusAs(values, status) {
    const pool = this._pool()
    let queries = '';
    values.forEach(record=> {
      queries += `UPDATE tbl_number SET status = '${status}' WHERE id = ${record.id}; `;
    })
    this._execute(pool)(queries)()
  }

  async getRandomAvailable() {
    // using this approach http://jan.kneschke.de/projects/mysql/order-by-rand/
    const pool = this._pool()
    return this._execute(pool)
      (`SELECT id, number, status, added, lastUsed
          FROM tbl_number AS r1 JOIN
          (SELECT CEIL(RAND() *  (SELECT MAX(id) FROM tbl_number)) AS id2) AS r2
          WHERE r1.id >= r2.id2
          ORDER BY r1.id ASC
          LIMIT 10`)
   ().then(results => {
      if (results && results.length > 0) {
        return Promise.resolve(results)
      } else {
        return Promise.resolve({})
      }
    })
  }

  async getStatusOfNumber(numberr) {
    const pool = this._pool()
    return this._execute(pool)('SELECT id, number, status, added, lastUsed FROM `tbl_number` WHERE `number` = ?')([numberr]).then(results => {
      if (results && results.length > 0) {
        return Promise.resolve(results[0])
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