const { synthesizeSpeech } = require('../../src/services/azure-tts');
const path = require('path');

describe('Azure TTS Service', () => {
    it('should generate a speech file', async () => {
        const audioFile = await synthesizeSpeech('Hello, this is a test.');
        expect(audioFile).toBe(path.join(__dirname, '../../src/output.wav')); // Path where the file is saved
    });

    it('should throw an error if text is empty', async () => {
        await expect(synthesizeSpeech('')).rejects.toThrow('Text is required');
    });
});
