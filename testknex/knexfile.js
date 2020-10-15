// Update with your config settings.

module.exports = {

  
    development: {
      client: 'pg',
      connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'admin',
        database : 'monitor',
        charset: 'utf8'
      },
      migrations: {
        directory: __dirname + '/knex/migrations',
      },
      seeds: {
        directory: __dirname + '/knex/seeds'
      }
    }

 
};
