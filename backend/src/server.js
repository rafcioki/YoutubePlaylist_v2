import Hapi from 'hapi';
import SecretKeys from '../config/secretKeys';
import jwt from 'jsonwebtoken';
import hapiJwt from 'hapi-auth-jwt';
import routes from './ServerRoutes/routes';

const server = new Hapi.Server();

server.connection({
    port: 8080,
    routes: {
        cors: true
    }
});

// const routes = [
//     {
//         path: '/session/video',
//         method: 'POST',
//         config: {
//             auth: {
//                 strategy: 'token'
//             }
//         },
//         handler: (request, reply) => {
//             const { videoUrl, sessionId } = request.payload;
//             const credentials = request.auth.credentials;

//             if (sessionId === credentials.sessionId) {
//                 const newVideo = { 
//                     url: videoUrl,
//                     fkSession: sessionId
//                  };

//                 Knex('video')
//                     .insert(newVideo)
//                     .then(createdVideoId => {
//                         reply(createdVideoId);
//                     })
//                     .catch(error => {
//                         reply('An error occurred');
//                     });
//             } else {
//                 reply("Unathorized");
//             }
//         }
//     },

//     {
//         path: '/session/videos/{id}',
//         method: 'GET',
//         handler: (request, reply) => {
//             const { id } = request.params;

//             Knex('video')
//                 .where({fkSession: id})
//                 .select('url')
//                 .then(results => {
//                     reply({
//                         data: results
//                     });
//                 });
//         }
//     },

//     {
//         path: '/session',
//         method: 'GET',
//         handler: (request, reply) => {
//             Knex('session')
//                 .where({})
//                 .select('guid').then(results => {
//                     reply({
//                         dataCount: results.length,
//                         data: results
//                     });
//                 });
//         }
//     },

//     {
//         path: '/session/id/{id}',
//         method: 'GET',
//         handler: (request, reply) => {
//             const { id } = request.params;
            
//             Knex('session')
//                 .where({guid: id})
//                 .select('name').then(results => {
//                     reply({
//                         dataCount: results.length,
//                         data: results
//                     });
//             });
//         }
//     },

//     {
//         path: '/session/name/{name}',
//         method: 'GET',
//         handler: (request, reply) => {
//             const { name } = request.params;

//             Knex('session')
//                 .where({name: name})
//                 .select('name').then(results => {
//                     reply({
//                         dataCount: results.length,
//                         data: results
//                     });
//                 });
//         }
//     },

//     {
//         path:'/session',
//         method: 'POST',
//         handler: (request, reply) => {
//             const { identifier, password } = request.payload;

//             if (!identifier) {
//                 identifier = shortid.generate();
//             }

//             Knex('session')
//                 .where({ identifier: identifier })
//                 .select('identifier')
//                 .then(results => {
//                     if (results && results.length > 0) {
//                         reply('Provided id already exists.');
//                     } else {
//                         let salt = null, hash = null;

//                         if (password === null) {

//                         } else {

//                         }

//                         const numberOfRoundsWhenGeneratingSalt = 10;
//                         const salt = csprng(160, 36);
//                         bcrypt.hash(salt + password, 
//                         numberOfRoundsWhenGeneratingSalt, 
//                         function(err, hash) {
//                             const session = {
//                                 name, 
//                                 passwordHash: hash,
//                                 guid: GUID.v4(),
//                                 passwordSalt: salt
//                             };
            
//                             Knex('session')
//                                 .insert(session)
//                                 .then(function(createdSessionId) {
//                                     reply(createdSessionId);
//                                 })
//                                 .catch(error => {
//                                     reply('Error occured.');
//                                 });
//                             });
//                     }
//                 });
//         }
//     }
// ];

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