const sdk = require('microsoft-cognitiveservices-speech-sdk');

class AzureTTS {
  constructor() {
    this.speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_API_KEY,
      process.env.AZURE_REGION
    );
    this.speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
  }

  async synthesize(text, voice, format = "audio-24khz-48kbitrate-mono-mp3") {
    return new Promise((resolve, reject) => {
      try {
        this.speechConfig.speechSynthesisVoiceName = voice || this.speechConfig.speechSynthesisVoiceName;
        
        const audioConfig = sdk.AudioConfig.fromStreamOutput();
        const synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, audioConfig);

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
            reject(error);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new AzureTTS();