/**
 * Registration validation schema
 * Defines validation rules for user registration (name, email, password)
 */
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = registerSchema;
