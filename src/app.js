require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { synthesizeSpeech } = require('./services/azure-tts');  // Import the synthesis service
const ttsRoutes = require('./routes/tts');  // Correct route import

const { limiter } = require('./middlewares/rateLimit');

// Apply rate limiting
app.use(limiter);
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tts', ttsRoutes);

// Don't start the server if we're running tests
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
