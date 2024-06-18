const { Storage } = require('@google-cloud/storage');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

const storage = new Storage();
let dogModel, catModel;

async function downloadModelFile(bucketName, srcFilename, destFilename) {
    const options = {
        destination: destFilename,
    };
    await storage.bucket(bucketName).file(srcFilename).download(options);
    console.log(`${srcFilename} downloaded to ${destFilename}.`);
}

async function loadModel(modelType) {
    let model, modelPath, localModelPath;

    if (modelType === 'dog') {
        if (dogModel) return dogModel;
        modelPath = 'PetVerse-dog-model/model.json';
        localModelPath = path.join(__dirname, 'PetVerse-dog-model.json');
    } else if (modelType === 'cat') {
        if (catModel) return catModel;
        modelPath = 'PetVerse-cat-model/model.json';
        localModelPath = path.join(__dirname, 'PetVerse-cat-model.json');
    } else {
        throw new Error('Unknown model type');
    }

    await downloadModelFile('dataset-model-petverse', modelPath, localModelPath);

    model = await tf.loadLayersModel(`file://${localModelPath}`);
    console.log(`${modelType} model loaded successfully`);

    if (modelType === 'dog') {
        dogModel = model;
    } else if (modelType === 'cat') {
        catModel = model;
    }

    return model;
}

module.exports = loadModel;
