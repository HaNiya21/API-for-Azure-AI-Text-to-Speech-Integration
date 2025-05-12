const sdk = require('microsoft-cognitiveservices-speech-sdk');
const path = require('path');

// Create a function for text-to-speech synthesis
const synthesizeSpeech = (text) => {
    return new Promise((resolve, reject) => {
        const audioFile = path.join(__dirname, 'output.wav'); // Define output path

        // Azure SDK Speech Config
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
        const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFile);

        // Set voice for synthesis
        speechConfig.speechSynthesisVoiceName = "en-US-AvaNeural";  // You can change this as needed

        // Create speech synthesizer
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(
            text,
            (result) => {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    resolve(audioFile);  // Return the file path
                } else {
                    reject(new Error(`Speech synthesis failed: ${result.errorDetails}`));
                }
                synthesizer.close();
            },
            (err) => {
                reject(err);
                synthesizer.close();
            }
        );
    });
};

module.exports = { synthesizeSpeech };
