const crypto = require('crypto');
const { APIError } = require('../utils/errors');

// Validate API keys with constant-time comparison
module.exports = (req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  
  if (!clientKey) throw new APIError(401, 'API key required');
  
  const validKeys = process.env.API_KEYS.split(',');
  const isValid = validKeys.some(validKey => 
    crypto.timingSafeEqual(
      Buffer.from(clientKey),
      Buffer.from(validKey)
    );
  
  if (!isValid) throw new APIError(403, 'Invalid API key');
  next();
};