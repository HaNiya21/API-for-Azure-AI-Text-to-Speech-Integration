const Joi = require('joi');

const { BadRequestError } = require('../utils/errors');

if (error) throw new BadRequestError(error.details[0].message);

const validateTTSRequest = (req, res, next) => {
  const schema = Joi.object({
    text: Joi.string().required().max(1000),
    voice: Joi.string().default('en-US-JennyNeural'),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateTTSRequest };