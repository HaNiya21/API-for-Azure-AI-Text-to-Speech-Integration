const azureTTS = require('../services/azure-tts');

async function synthesize(req, res) {
  try {
    const { text, voice } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const audioData = await azureTTS.synthesize(text, voice);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': 'inline; filename="speech.mp3"'
    });
    res.send(audioData);
  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ error: 'Failed to synthesize speech' });
  }
}

module.exports = { synthesize };