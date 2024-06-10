const predictModel = require('../models/predict');
 
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
  }
]
 
module.exports = predictRoutes;