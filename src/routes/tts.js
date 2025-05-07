const express = require('express');
const router = express.Router();
const AzureTTS = require('../services/azure-tts');

const { validateTTSRequest } = require('../middlewares/validate');
router.post('/synthesize', validateTTSRequest, async (req, res) => { ... });
const { authenticate } = require('../middlewares/auth');
/**
 * @swagger
 * /api/tts/synthesize:
 *   post:
 *     summary: Convert text to speech
 *     tags: [TTS]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               voice:
 *                 type: string
 *                 default: "en-US-JennyNeural"
 *     responses:
 *       200:
 *         description: Returns audio file
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post('/synthesize', authenticate, validateTTSRequest, async (req, res) => { ... });


router.post('/synthesize', async (req, res) => {
  try {
    const { text, voice } = req.body;
    if (!text) throw new Error('Text is required');
    
    const audioData = await AzureTTS.synthesize(text, voice);
    res.set('Content-Type', 'audio/mpeg');
    res.send(audioData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;