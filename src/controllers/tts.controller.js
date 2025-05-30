const { synthesizeSpeech } = require('../services/azure-tts');
const { body, validationResult } = require('express-validator');

const convertTextToSpeech = async (req, res, next) => {
    await body('text').isLength({ min: 1 }).withMessage('Text is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

// Controller function to handle Text-to-Speech requests
const convertTextToSpeech = async (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        // Call the service to synthesize speech and generate the file
        const audioUrl = await synthesizeSpeech(text);
        
        // Return the generated audio file URL
        res.json({
            message: 'Text-to-Speech synthesis completed.',
            audioUrl: audioUrl  // The generated audio file URL
        });
    } catch (error) {
        next(error);  // Pass the error to the error handling middleware
    }
};

module.exports = { convertTextToSpeech };
