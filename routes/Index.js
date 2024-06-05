const questionRoutes = require('./Question');
const answerRoutes = require('./Answer');

const routes = [
    {
        method: 'GET',
        path: '/api',
        handler: (request, h) => {
            return "This api is reserved for quora clone";
        }
    },
    ...questionRoutes,
    ...answerRoutes
];

module.exports = routes;