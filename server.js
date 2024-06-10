const Hapi = require('@hapi/hapi');
const router = require('./routes/Index');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 8180,
        host: 'localhost',
        routes: {
            cors: {
                origin: ["localhost"],
                headers: ["Accept", "Content-Type"],
                additionalHeaders: ["X-Requested-With"]
            }
        }
    });

    // Routes
    server.route(router);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
