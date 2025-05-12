const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Placeholder for authentication middleware
function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

// Example route to generate speech
app.post('/api/tts/synthesize', authenticate, async (req, res) => {
    try {
        const { text, voice = 'en-US-JennyNeural' } = req.body;
        
        // Make API request to Azure Text-to-Speech API
        const response = await axios.post(`https://${process.env.AZURE_REGION}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`, {
            headers: {
                'Ocp-Apim-Subscription-Key': process.env.AZURE_API_KEY,
            },
        });

        const audioData = await axios.post(`https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
            data: {
                text: text,
                voice: voice,
                format: 'audio-24khz-48kbitrate-mono-mp3'
            }
        });

        res.status(200).send(audioData.data);
    } catch (error) {
        res.status(500).json({ message: 'Error generating speech' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
