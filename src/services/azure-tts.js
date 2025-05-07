const { SpeechConfig, AudioConfig, SpeechSynthesizer } = require('@azure/cognitiveservices-speech');

class AzureTTS {
  constructor() {
    this.speechConfig = SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );
  }

  async synthesize(text, voice = 'en-US-JennyNeural') {
    this.speechConfig.speechSynthesisVoiceName = voice;
    const synthesizer = new SpeechSynthesizer(this.speechConfig);
    
    return new Promise((resolve, reject) => {
      synthesizer.speakTextAsync(
        text,
        (result) => {
          if (result.reason === ResultReason.SynthesizingAudioCompleted) {
            resolve(result.audioData);
          } else {
            reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
          }
          synthesizer.close();
        },
        (error) => {
          reject(error);
          synthesizer.close();
        }
      );
    });
  }
}

module.exports = new AzureTTS();