const request = require('supertest');
const app = require('../../src/app');
const AzureTTS = require('../../src/services/azure-tts');

jest.mock('../../src/services/azure-tts');

describe('TTS API Integration', () => {
  beforeAll(() => {
    AzureTTS.synthesize.mockResolvedValue(Buffer.from('mock-audio-data'));
  });

  test('POST /synthesize returns audio', async () => {
    const res = await request(app)
      .post('/api/tts/synthesize')
      .set('Authorization', 'Bearer valid-token')
      .send({ text: 'Hello' });
    
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toBe('audio/mpeg');
  });
});