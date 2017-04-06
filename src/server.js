import Hapi from 'hapi';

const server = new Hapi.Server();

server.connection({
    port: 8080
});

server.start(err => {
    if (err) {
        console.error(err);
    }

    console.log(`Server started at ${server.info.uri}`);
});