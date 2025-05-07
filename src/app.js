const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const logger = require('./utils/logger');

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
const limiter = require('./middlewares/rateLimit');
app.use('/api/tts', limiter);

const setupSwagger = require('./utils/swagger');
setupSwagger(app);

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

app.use((err, req, res, next) => {
    logger.error(err.stack);
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
  });

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'API Running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});