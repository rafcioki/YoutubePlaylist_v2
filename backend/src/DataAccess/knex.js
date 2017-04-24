import credentials from '../../config/credentials';
import dbSettings from '../../config/db.settings';

export default require('knex')({
    client: 'mysql',
    connection: {
        host: dbSettings.host,

        user: credentials.localDbCredentials.username,
        password: credentials.localDbCredentials.password,

        database: dbSettings.databaseName,
        charset: 'utf8'
    }
});