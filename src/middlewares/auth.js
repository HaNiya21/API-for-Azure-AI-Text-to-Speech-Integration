const jwt = require('jsonwebtoken');
const { APIError } = require('../utils/errors');

module.exports = (req, res, next) => {
  try {
    const token = req.headers['x-api-key'] || req.query.api_key;
    
    if (!token) throw new APIError(401, 'API key required');
    
    // Simple key validation (or use JWT)
    const validKeys = process.env.API_KEYS.split(',');
    if (!validKeys.includes(token)) {
      throw new APIError(403, 'Invalid API key');
    }
    
    next();
  } catch (error) {
    next(error);
  }
};