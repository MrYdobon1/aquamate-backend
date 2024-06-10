require('dotenv').config();
// const InputError = require("../exceptions/InputError");
const Hapi = require('@hapi/hapi');
const loadModel = require('./services/loadModel');
const routes = require('./routes/index');
 
(async () => {
    const server = Hapi.server({
        port: 3030,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*'],
            },
        },
    });

   
    const model = await loadModel();
    server.app.model = model;
 
   server.route(routes);
 
    // server.ext('onPreResponse', function (request, h) {
    //     const response = request.response;
 
    //     if (response instanceof InputError) {
    //         const newResponse = h.response({
    //             status: 'fail',
    //             message: `${response.message} Silakan gunakan foto lain.`
    //         })
    //         newResponse.code(response.statusCode)
    //         return newResponse;
    //     }
 
    //     if (response.isBoom) {
    //         const { statusCode } = response.output;
    //         const newResponse = h.response({
    //             status: 'fail',
    //             message: response.message
    //         }).code(statusCode);
    //         return newResponse;
    //     }
 
    //     return h.continue;
    // });
 
    await server.start();
    console.log(`Server start at: ${server.info.uri}`);
})();