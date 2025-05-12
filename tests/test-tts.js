require('dotenv').config();
const sdk = require('microsoft-cognitiveservices-speech-sdk');

const speechConfig = sdk.SpeechConfig.fromSubscription(
  process.env.AZURE_API_KEY,
  process.env.AZURE_REGION
);

function synthesizeSpeech() {
  return new Promise((resolve, reject) => {
    const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    synthesizer.speakTextAsync(
      "Hello world! This is a test of Azure Text to Speech.",
      result => {
        synthesizer.close();
        if (result) {
          console.log("Synthesis succeeded!");
          resolve();
        } else {
          reject(new Error("No result received"));
        }
      },
      error => {
        synthesizer.close();
        reject(error);
      }
    );
  });
}

synthesizeSpeech()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });