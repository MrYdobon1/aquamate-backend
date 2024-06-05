const mongoose = require('mongoose');
const { Firestore } = require('@google-cloud/firestore');

const url = "mongodb://kvndebruyne17:apaajadeh@ac-5j0ke2c-shard-00-00.gdp96wf.mongodb.net:27017,ac-5j0ke2c-shard-00-01.gdp96wf.mongodb.net:27017,ac-5j0ke2c-shard-00-02.gdp96wf.mongodb.net:27017/quora-clone-merm?ssl=true&replicaSet=atlas-10z3v0-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster1"
const db = new Firestore();
// module.exports.connect = () =>{
//     mongoose.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log("Database connected");
//     }).catch((error) => console.log("Error connecting", error))
// }

module.exports = db;