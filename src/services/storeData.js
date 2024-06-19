const { Storage } = require('@google-cloud/storage');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert('path/to/your-service-account-file.json'),
    storageBucket: 'dataset-model-petverse'  // Bucket name
});

const storage = admin.storage();
const firestore = admin.firestore();

const bucketName = 'dataset-model-petverse';
const collectionName = 'inference-result';

const storeData = async (file, prediction) => {
    // Get a reference to the bucket and file
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(file.originalname);

    // Upload the file to GCS
    await blob.save(file.buffer);

    // Create a new document in the Firestore collection
    const docRef = firestore.collection(collectionName).doc();
    await docRef.set({
        imageUrl: `https://storage.googleapis.com/${bucketName}/${file.originalname}`,
        prediction: prediction,
        timestamp: new Date(),
    });

    // Return the stored data
    return {
        imageUrl: `https://storage.googleapis.com/${bucketName}/${file.originalname}`,
        prediction: prediction,
    };
};

module.exports = {
    storeData,
};
