var credentials = require('../../config/credentials');
var dbSettings = require('../../config/db.settings');

module.exports = {
    development: {
        migrations: { tableName: 'knex_migrations' },
        seeds: { tableName: './seeds' },

        client: 'mysql',
        connection: {
            host: dbSettings.host,

            user: credentials.databaseAzureCredentials.username,
            password: credentials.databaseAzureCredentials.password,

            database: dbSettings.databaseName,
            charset: 'utf8'
        }
    }
};