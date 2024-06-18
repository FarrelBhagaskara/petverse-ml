const { Firestore } = require('@google-cloud/firestore');
const firestore = new Firestore();

async function storePrediction(image, breed) {
    const docRef = firestore.collection('predictions').doc();
    await docRef.set({
        image,
        result: breed,
        timestamp: Firestore.Timestamp.now(),
    });
}

async function getBreedInfo(breed) {
    const breedInfoRef = firestore.collection('breeds').doc(breed);
    const breedInfoDoc = await breedInfoRef.get();
    return breedInfoDoc.exists ? breedInfoDoc.data() : {};
}

async function getAllBreeds() {
    const breedsRef = firestore.collection('breeds');
    const snapshot = await breedsRef.get();
    const breeds = [];
    snapshot.forEach(doc => {
        breeds.push({ id: doc.id, ...doc.data() });
    });
    return breeds;
}

module.exports = {
    storePrediction,
    getBreedInfo,
    getAllBreeds,
};
