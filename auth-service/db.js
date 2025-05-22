const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'root',
  database: 'microdb'
});

module.exports = pool;
