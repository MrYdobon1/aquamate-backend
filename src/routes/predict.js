const { predictModel, getAllPredictions } = require('../models/predict');

 
const predictRoutes = [
  {
    path: '/aquamate/predict',
    method: 'POST',
    handler: predictModel,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  //   ,
  //   options: {
  //     auth: 'jwt'
  // }
  },

  {
    path: '/aquamate/predict',
    method: 'GET',
    handler: getAllPredictions,
      //   options: {
      //     auth: 'jwt'
      // }
  }
]
 
module.exports = predictRoutes;