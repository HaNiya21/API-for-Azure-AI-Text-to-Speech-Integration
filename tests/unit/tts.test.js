const { synthesize } = require('../../src/controllers/tts.controller');

describe('TTS Controller', () => {
  test('should require text parameter', async () => {
    const mockReq = { body: {} };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    await synthesize(mockReq, mockRes);
    
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Text is required' });
  });
});