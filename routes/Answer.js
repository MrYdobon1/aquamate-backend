const answerDB = require("../models/Answer");

const answerRoutes = [
    {
        method: 'POST',
        path: '/api/answers',
        handler: async (request, h) => {
            try {
                await answerDB.create({
                    answer: request.payload.answer,
                    questionId: request.payload.questionId,
                    user: request.payload.user,
                });
                return h.response({
                    status: true,
                    message: "Answer added successfully"
                }).code(201);
            } catch (e) {
                return h.response({
                    status: false,
                    message: "Error while adding answer"
                }).code(500);
            }
        }
    }
];

module.exports = answerRoutes;