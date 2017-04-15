import credentials from '../../config/credentials';
import dbSettings from '../../config/db.settings';

export default require('knex')({
    client: 'mysql',
    connection: {
        host: dbSettings.host,

        user: credentials.databaseAzureCredentials.username,
        password: credentials.databaseAzureCredentials.password,

        database: dbSettings.databaseName,
        charset: 'utf8'
    }
});