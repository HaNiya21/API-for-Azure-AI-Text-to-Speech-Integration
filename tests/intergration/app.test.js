const request = require('supertest');
const app = require('../../src/app');

describe('API Tests', () => {
    it('should handle POST requests to /api/tts/convert', async () => {
        const response = await request(app)
            .post('/api/tts/convert')
            .send({ text: 'Test text' });

        expect(response.status).toBe(200);
        expect(response.body.audioUrl).toBe('output.mp3');
    });
});
