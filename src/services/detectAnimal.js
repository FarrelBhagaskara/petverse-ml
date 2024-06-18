const tf = require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');

let detectionModel;

async function loadDetectionModel() {
    if (!detectionModel) {
        detectionModel = await cocoSsd.load();
    }
    return detectionModel;
}

async function detectAnimal(imageBuffer) {
    const model = await loadDetectionModel();
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const predictions = await model.detect(imageTensor);

    // Cari prediksi dengan label "cat" atau "dog"
    const animalPrediction = predictions.find(prediction => prediction.class === 'cat' || prediction.class === 'dog');

    return animalPrediction ? animalPrediction.class : null;
}

module.exports = detectAnimal;
