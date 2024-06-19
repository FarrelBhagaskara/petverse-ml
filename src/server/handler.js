const inferenceService = require('../services/inferenceService');

const uploadImage = async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            throw new InputError('No file uploaded');
        }

        const result = await inferenceService.runInference(file);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

module.exports = {
    uploadImage,
};
