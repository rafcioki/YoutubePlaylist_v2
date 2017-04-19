import Hapi from 'hapi';
import Knex from './DataAccess/knex';
import SecretKeys from '../config/secretKeys';
import GUID from 'node-uuid';
import bcrypt from 'bcrypt';
import csprng from 'csprng';
import jwt from 'jsonwebtoken';
import hapiJwt from 'hapi-auth-jwt';

const server = new Hapi.Server();

server.connection({
    port: 8080,
    routes: {
        cors: true
    }
});

const routes = [
    {
        path: '/connectToSession',
        method: 'POST',
        handler: (request, reply) => {
            const { sessionName, sessionPassword, username } = request.payload;

            Knex('session')
            .where({
                name: sessionName
            })
            .select('passwordSalt', 'passwordHash', 'guid')
            .then(results => {
                if (!results || results.length === 0) {
                    reply("Such session does not exists.");
                } else {
                    let saltedUserPassword = results[0].passwordSalt + sessionPassword;
                    let passwordHash = results[0].passwordHash;
                    bcrypt.compare(saltedUserPassword,
                    passwordHash,
                    function (error, res) {
                        if (res) {
                            const sessionId = results[0].guid;
                            const token = jwt.sign({
                                sessionId,
                                username
                            },
                            SecretKeys.jwtKey, {
                                algorithm: 'HS256',
                                expiresIn: '1h'
                            });

                            reply({
                                token
                            });
                        } else {
                            reply("Authorization failed.");
                        }
                    });
                }
            });
        }
    },

    {
        path: '/session/video',
        method: 'PUT',
        config: {
            auth: {
                strategy: 'token'
            }
        },
        handler: (request, reply) => {
            const { videoUrl, sessionId } = request.payload;
            const credentials = request.auth.credentials;

            if (sessionId === credentials.sessionId) {
                const newVideo = { 
                    url: videoUrl,
                    fkSession: sessionId
                 };

                Knex('video')
                    .insert(newVideo)
                    .then(createdVideoId => {
                        reply(createdVideoId);
                    })
                    .catch(error => {
                        reply('An error occurred');
                    });
            } else {
                reply("Unathorized");
            }
        }
    },

    {
        path: '/session/videos/{id}',
        method: 'GET',
        handler: (request, reply) => {
            const { id } = request.params;

            Knex('video')
                .where({fkSession: id})
                .select('url')
                .then(results => {
                    reply({
                        data: results
                    });
                });
        }
    },

    {
        path: '/session',
        method: 'GET',
        handler: (request, reply) => {
            Knex('session')
                .where({})
                .select('guid').then(results => {
                    reply({
                        dataCount: results.length,
                        data: results
                    });
                });
        }
    },

    {
        path: '/session/{id}',
        method: 'GET',
        handler: (request, reply) => {
            const { id } = request.params;
            
            Knex('session')
                .where({guid: id})
                .select('name').then(results => {
                    reply({
                        dataCount: results.length,
                        data: results
                    });
            });
        }
    },

    {
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
    }
];

server.register(hapiJwt, err => {
    server.auth.strategy('token', 'jwt', {
        key: SecretKeys.jwtKey,

        verifyOptions: {
            algorithms: [ 'HS256' ]
        }
    });

    // Make sure the routes are attached AFTER the auth module has been loaded.
    routes.forEach(route => {
        server.route(route);
    });
});

server.start(err => {
    if (err) {
        console.error(err);
    }

    console.log(`Server started at ${server.info.uri}`);
});