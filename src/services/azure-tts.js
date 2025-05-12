const speechSDK = require('@azure/cognitiveservices-speech-sdk');
const { AZURE_API_KEY, AZURE_REGION } = process.env;

const convertToSpeech = async (text) => {
    const audioConfig = speechSDK.AudioConfig.fromAudioFileOutput('output.mp3');
    const speechConfig = speechSDK.SpeechConfig.fromSubscription(AZURE_API_KEY, AZURE_REGION);
    const synthesizer = new speechSDK.SpeechSynthesizer(speechConfig, audioConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(
            text,
            (result) => {
                if (result.reason === speechSDK.ResultReason.SynthesizingAudioCompleted) {
                    resolve('output.mp3');  // Assuming the file is saved as 'output.mp3'
                } else {
                    reject(new Error('Speech synthesis failed.'));
                }
            },
            (err) => {
                reject(err);
            }
        );
    });
};

module.exports = { convertToSpeech };
