module.exports = {
  serverPort: process.env.SERVER_PORT,
  mysqlConfig: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    debug: process.env.MYSQL_DEBUG,
    multipleStatements: true
  },
  redisConfig: {
    auth: process.env.REDIS_AUTH,
    tblName: process.env.REDIS_CACHE_KEY,
  }
}