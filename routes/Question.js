const questionDB = require('../models/Question');

const questionRoutes = [
    {
      method: 'POST',
      path: '/api/questions',
      handler: async (request, h) => {
        try {
          const id = await questionDB.create({
            questionName: request.payload.questionName,
            questionUrl: request.payload.questionUrl,
          });
          return h.response({
            status: true,
            message: "Question added successfully",
            id: id
          }).code(201);
        } catch (e) {
          return h.response({
            status: false,
            message: "Error while adding question"
          }).code(500);
        }
      }
    },
    {
      method: 'GET',
      path: '/api/questions',
      handler: async (request, h) => {
        try {
          const questions = await questionDB.getAllWithAnswers();
          return h.response(questions).code(200);
        } catch (e) {
          return h.response({
            status: false,
            message: "Unable to get the question details"
          }).code(500);
        }
      }
    }
  ];
  
  module.exports = questionRoutes;

// const questionRoutes = [
//     {
//         method: 'POST',
//         path: '/api/questions',
//         handler: async (request, h) => {
//             try {
//                 await questionDB.create({
//                     questionName: request.payload.questionName,
//                     questionUrl: request.payload.questionUrl,
//                 });
//                 return h.response({
//                     status: true,
//                     message: "Question added successfully"
//                 }).code(201);
//             } catch (e) {
//                 return h.response({
//                     status: false,
//                     message: "Error while adding question"
//                 }).code(500);
//             }
//         }
//     },
//     {
//         method: 'GET',
//         path: '/api/questions',
//         handler: async (request, h) => {
//             try {
//                 const questions = await questionDB.aggregate([
//                     {
//                         $lookup: {
//                             from: "answers",
//                             localField: "_id",
//                             foreignField: "questionId",
//                             as: "allAnswers",
//                         },
//                     },
//                 ]).exec();
//                 return h.response(questions).code(200);
//             } catch (e) {
//                 return h.response({
//                     status: false,
//                     message: "Unable to get the question details"
//                 }).code(500);
//             }
//         }
//     }
// ];

// module.exports = questionRoutes;