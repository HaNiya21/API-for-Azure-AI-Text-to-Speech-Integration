const { AzureTTS } = require('../../services/azure-tts');
const { expect } = require('chai');
const sinon = require('sinon');

describe('AzureTTS Service', () => {
  let tts;

  before(() => {
    process.env.AZURE_API_KEY = 'test_key';
    process.env.AZURE_REGION = 'eastus';
    tts = new AzureTTS();
  });

  it('should synthesize text to speech', async () => {
    const mockAudio = Buffer.from('test');
    sinon.stub(tts.speechConfig, 'fromSubscription').returns({
      speakSsmlAsync: (ssml, successCallback) => successCallback({
        reason: 1, // ResultReason.SynthesizingAudioCompleted
        audioData: mockAudio
      })
    });

    const result = await tts.synthesize('test');
    expect(result).to.equal(mockAudio);
  });
});