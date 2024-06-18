const loadModel = require('./loadModel');
const detectAnimal = require('./detectAnimal');
const tf = require('@tensorflow/tfjs-node');

async function predictBreed(imageBuffer) {
    const animalType = await detectAnimal(imageBuffer);

    if (!animalType) {
        throw new Error('Animal not detected or not recognized as cat or dog');
    }

    const model = await loadModel(animalType);
    const imageTensor = tf.node.decodeImage(imageBuffer);
    const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalizedImage = resizedImage.div(255.0).expandDims(0);
    const prediction = model.predict(normalizedImage);
    const result = prediction.arraySync();

    return { breed: result[0], animalType };
}

module.exports = predictBreed;
