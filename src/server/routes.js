const express = require('express');
const multer = require('multer');
const handler = require('./handler');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), handler.uploadImage);

module.exports = router;
