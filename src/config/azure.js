const { SpeechConfig } = require('microsoft-cognitiveservices-speech-sdk');
const logger = require('../utils/logger');

let speechConfig;

try {
  speechConfig = SpeechConfig.fromSubscription(
    process.env.AZURE_API_KEY,
    process.env.AZURE_REGION
  );
  speechConfig.speechSynthesisOutputFormat = 5; // MP3 format
  speechConfig.setProxy('http://proxy.oceandoc.com:3128'); // If behind corporate proxy
} catch (error) {
  logger.error('Azure config failed - Invalid key/region');
  process.exit(1); // Fail fast if config is invalid
}

module.exports = speechConfig;