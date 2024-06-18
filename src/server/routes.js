const express = require('express');
const { handlePredictBreed, handleGetBreeds } = require('./handler');
const router = express.Router();

router.post('/predict', handlePredictBreed);
router.get('/breeds', handleGetBreeds);

module.exports = router;
