const predictBreed = require('../services/inferenceService');
const { storePrediction, getBreedInfo } = require('../services/storeData');

async function handlePredictBreed(req, res) {
    try {
        const imageBuffer = Buffer.from(req.body.image, 'base64');
        const { breed, animalType } = await predictBreed(imageBuffer);
        await storePrediction(req.body.image, breed);
        const breedInfo = await getBreedInfo(breed);
        res.status(200).send({ result: breed, animalType, breedInfo });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function handleGetBreeds(req, res) {
    try {
        const breeds = await getAllBreeds();
        res.status(200).send(breeds);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    handlePredictBreed,
    handleGetBreeds,
};
