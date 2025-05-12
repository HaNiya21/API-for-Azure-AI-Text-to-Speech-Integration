const express = require('express');
const { convertTextToSpeech } = require('../controllers/tts.controller');

const router = express.Router();

// POST request to convert text to speech
router.post('/convert', convertTextToSpeech);

module.exports = router;
