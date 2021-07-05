const dbConfig = require('config');

console.log(dbConfig.db.host, 'host');

module.exports = {
  dev: {
    host: dbConfig.db.host,
    user: dbConfig.db.user,
    password: dbConfig.db.password,
    database: dbConfig.db.db,
    port: dbConfig.db.port,
    driver: 'pg',
    multipleStatements: 'true',
  },
  'sql-file': true,
};
