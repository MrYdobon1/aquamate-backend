const predictClassification = require('../services/inferenceServices');
const crypto = require('crypto');
 
async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const {label, explanation} = await predictClassification(model, image);
  const id = crypto.randomUUID();

  if (!label || !explanation) {
    return h.response({
      status: 'fail',
      message: 'Result or explanation is missing'
    }).code(400);
  }
 
  const data = {
    "id": id,
    "result": label,
    "explanation": explanation,

  }
 
  const response = h.response({
    status: 'success',
    data
  })

  response.code(201);
  return response;
}
 
module.exports = postPredictHandler;