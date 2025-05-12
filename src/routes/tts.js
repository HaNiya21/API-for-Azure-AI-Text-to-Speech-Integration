const express = require('express');
const router = express.Router();
const { authenticate, rateLimit } = require('../middlewares/auth');
const ttsController = require('../controllers/tts.controller');

router.post(
  '/synthesize',
  authenticate,
  rateLimit(10, 60000), // 10 requests per minute
  ttsController.synthesize
);

module.exports = router;