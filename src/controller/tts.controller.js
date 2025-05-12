const azureTTS = require('../services/azure-tts');
const { APIError } = require('../utils/errors');

async function synthesizeSpeech(req, res, next) {
  try {
    const { text, voice, format } = req.body;
    
    if (!text) {
      throw new APIError(400, 'Text is required');
    }

    const audioData = await azureTTS.synthesize(text, voice, format);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="speech.mp3"'
    });
    res.send(audioData);
  } catch (error) {
    next(error);
  }
}

module.exports = { synthesizeSpeech };