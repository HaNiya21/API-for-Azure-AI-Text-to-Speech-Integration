const request = require('supertest');
const app = require('../../src/app');

describe('POST /api/tts/convert', () => {
    it('should return a success message with audio URL', async () => {
        const response = await request(app)
            .post('/api/tts/convert')
            .send({ text: 'Hello, world!' });

        expect(response.status).toBe(200);
        expect(response.body.audioUrl).toBe('output.mp3');
    });

    it('should return error for missing text', async () => {
        const response = await request(app)
            .post('/api/tts/convert')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Text is required');
    });
});
