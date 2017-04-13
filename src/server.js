import Hapi from 'hapi';
import Knex from './DataAccess/knex';
import SecretKeys from '../config/secretKeys';
import GUID from 'node-uuid';
import bcrypt from 'bcrypt';
import csprng from 'csprng';

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
    path:'/session',
    method: 'PUT',
    handler: (request, reply) => {
        const { name, password } = request.payload;

        if (!name) {
            reply('You have to provide a name.');
        }

        Knex('session')
            .where({ name: name })
            .select('name')
            .then(results => {
                if (results && results.length > 0) {
                    reply('Provided name already exists.');
                } else {
                    const numberOfRoundsWhenGeneratingSalt = 10;
                    const salt = csprng(160, 36);
                    bcrypt.hash(salt + password, 
                    numberOfRoundsWhenGeneratingSalt, 
                    function(err, hash) {
                        const session = {
                            name, 
                            passwordHash: hash,
                            guid: GUID.v4(),
                            passwordSalt: salt
                        };
        
                        Knex('session')
                            .insert(session)
                            .then(function(createdSessionId) {
                                reply(createdSessionId);
                            })
                            .catch(error => {
                                reply('Error occured.');
                            });
                        });
                }
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