const predictClassification = require('../services/inferenceServices');
const crypto = require('crypto');
const db = require('../db');
 
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

async function getAllPredictions(request, h) {
  const predictionsRef = db.collection('predictions');

  try {
    const snapshot = await predictionsRef.get();
    if (snapshot.empty) {
      return h.response({
        status: 'success',
        data: [],
        message: 'No predictions found'
      }).code(200);
    }

    let predictions = [];
    snapshot.forEach(doc => {
      predictions.push({ id: doc.id, ...doc.data() });
    });

    return h.response({
      status: 'success',
      data: predictions
    }).code(200);

  } catch (error) {
    console.error('Error fetching predictions:', error.message);
    return h.response({
      status: 'fail',
      message: 'Error fetching predictions',
      error: error.message
    }).code(500);
  }
}

 
module.exports = { predictModel, getAllPredictions };