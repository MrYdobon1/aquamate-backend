const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
    const modelUrl = 'https://storage.googleapis.com/aquamate-backend/model.json';
    try {
        const model = await tf.loadLayersModel(modelUrl);
        console.log('Sukses'); // Pesan "sukses" akan dicetak ke konsol jika model berhasil dimuat
        return model;
    } catch (error) {
        console.error('Gagal memuat model:', error); // Cetak pesan kesalahan ke konsol jika terjadi kesalahan saat memuat model
        throw error; // Teruskan kembali kesalahan untuk ditangani di tempat lain jika perlu
    }
}
module.exports = loadModel;