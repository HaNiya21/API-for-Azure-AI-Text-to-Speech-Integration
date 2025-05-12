const request = require('supertest');
const app = require('../../src/app');  // Import app instance

describe('POST /api/tts/convert', () => {
    it('should convert text to speech and return an audio URL', async () => {
        const response = await request(app)
            .post('/api/tts/convert')
            .send({ text: 'Hello world!' });

        expect(response.status).toBe(200);
        expect(response.body.audioUrl).toBeDefined();
    });

    it('should return an error if no text is provided', async () => {
        const response = await request(app)
            .post('/api/tts/convert')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Text is required');
    });
});
