const { SpeechSynthesizer, SpeechConfig, AudioConfig } = require('microsoft-cognitiveservices-speech-sdk');
const logger = require('../utils/logger');

class AzureTTS {
  constructor() {
    this.speechConfig = SpeechConfig.fromSubscription(
      process.env.AZURE_API_KEY,
      process.env.AZURE_REGION
    );
    // Set default voice
    this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
  }

  async synthesize(text, voice, format = "audio-24khz-48kbitrate-mono-mp3") {
    return new Promise((resolve, reject) => {
      try {
        this.speechConfig.speechSynthesisVoiceName = voice || this.speechConfig.speechSynthesisVoiceName;
        this.speechConfig.speechSynthesisOutputFormat = format;

        const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
        const synthesizer = new SpeechSynthesizer(this.speechConfig, audioConfig);

        synthesizer.speakTextAsync(
          text,
          result => {
            synthesizer.close();
            if (result) {
              resolve(result.audioData);
            } else {
              reject(new Error("No audio data received"));
            }
          },
          error => {
            synthesizer.close();
            logger.error(`Azure TTS Error: ${error}`);
            reject(error);
          }
        );
      } catch (error) {
        logger.error(`Azure TTS Exception: ${error}`);
        reject(error);
      }
    });
  }
}

module.exports = new AzureTTS();