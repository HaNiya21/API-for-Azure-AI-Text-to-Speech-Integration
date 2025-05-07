const request = require('supertest');
const app = require('../src/app');

describe('TTS API', () => {
  it('should return 400 if no text is provided', async () => {
    const res = await request(app)
      .post('/api/tts/synthesize')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});