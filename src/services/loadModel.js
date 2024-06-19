const tf = require('@tensorflow/tfjs');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

// Initialize Google Cloud Storage
const storage = new Storage({
    projectId: 'petverse-423806',  // Project ID
    keyFilename: '/home/petverse-dataset/petverse-423806-c784a97fc161.json'  // Service account key
});

// Function to get a signed URL if your bucket is private
const getSignedUrl = async (bucketName, fileName) => {
    const options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);
    return url;
};

const loadModel = async () => {
    // GCS bucket name and model path
    const bucketName = 'dataset-model-petverse';
    const modelPath = 'gs://dataset-model-petverse/PetVerse-dog-model/model.json';

    const url = `https://storage.googleapis.com/${bucketName}/${modelPath}`;  // If the bucket is public

    return await tf.loadGraphModel(url);
};

module.exports = {
    loadModel,
};
