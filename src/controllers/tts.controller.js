const { convertToSpeech } = require('../services/azure-tts');

const convertTextToSpeech = async (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const audioUrl = await convertToSpeech(text);
        res.json({ audioUrl });
    } catch (error) {
        next(error);
    }
};

module.exports = { convertTextToSpeech };
