require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { synthesizeSpeech } = require('./services/azure-tts');  // Import the synthesis service
const ttsRoutes = require('./routes/tts');  // Correct route import

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tts', ttsRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
