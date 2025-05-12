const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const dotenv = require('dotenv');
const cors = require('cors');
const ttsRoutes = require('./routes/tts');
const authRoutes = require('./routes/auth');
const { rateLimit } = require('./middlewares/rateLimit');
const { logger } = require('./utils/logger');


dotenv.config();

const app = express();
app.use(bodyParser.json());
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tts', ttsRoutes);
app.use('/auth', authRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 

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
