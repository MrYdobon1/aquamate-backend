const predictClassification = require('../services/inferenceServices');
const crypto = require('crypto');
const db = require('../db');
 
class Predict{
  
}
async function predictModel(request, h) {
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
    "result": label,
    "explanation": explanation,
    timestamp: new Date().toISOString()
  }
 
  try {
    // Save prediction result to Firestore
    const predictionRef = db.collection('predictions').doc();
    const id = predictionRef.id;

    data.id = id;

    await predictionRef.set(data);

    const response = h.response({
      status: 'success',
      data
    });

    response.code(201);
    return response;
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Error saving prediction to Firestore'
    }).code(500);
  }
}
 
module.exports = predictModel;