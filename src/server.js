import Hapi from 'hapi';
import Knex from './DataAccess/knex';
import SecretKeys from '../config/secretKeys';

const server = new Hapi.Server();

server.connection({
    port: 8080
});

server.route({
    path: '/sessions',
    method: 'GET',
    handler: (request, reply) => {
        const getOperation = Knex('session')
        .where({
        })
        .select('guid').then(results => {
            reply({
                dataCount: results.length,
                data: results
            });
        });
    }
});

server.route({
    path: '/session/{id}',
    method: 'GET',
    handler: (request, reply) => {
        const { id } = request.params;
        const getOperation = Knex('session')
        .where({guid: id})
        .select('friendlyName').then(results => {
            reply({
                dataCount: results.length,
                data: results
            });
        });
    }
});

server.register(require('hapi-auth-jwt'), err => {
    server.auth.strategy('token', 'jwt', {
        key: SecretKeys.jwtKey,

        verifyOptions: {
            algorithms: [ 'HS256' ]
        }
    });
});

server.start(err => {
    if (err) {
        console.error(err);
    }

    console.log(`Server started at ${server.info.uri}`);
});