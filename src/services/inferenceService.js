const tf = require('@tensorflow/tfjs');
const fs = require('fs');
const { loadModel } = require('./loadModel');

async function runInference(imagePath) {
    // Load the model from GCS
    const model = await loadModel();

    // Read the image file
    const image = fs.readFileSync(imagePath);
    const tensor = tf.node.decodeImage(image).expandDims(0);

    // Run the model
    const prediction = model.predict(tensor);

    return prediction.arraySync();
}

module.exports = { runInference };
