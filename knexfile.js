// Update with your config settings.
// var config = require("./server/modules/config.js").state.db;
var config = { url: process.env.DB_URL || 'localhost',
  name:     process.env.DB_NAME || 'invenstory_db',
  username: process.env.DB_USER || null,
  password: process.env.DB_PASSWORD || null
};

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: config.url,
      user:     config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: config.url,
      user:     config.username,
      password: config.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
