const { Pool } = require('pg');

const pool = new Pool({
  user: 'webber',
  password: 'Password123',
  host: 'localhost',
  database: 'lightbnb'
});

module.exports = pool;