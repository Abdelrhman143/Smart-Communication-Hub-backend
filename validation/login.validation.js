/**
 * Login validation schema
 * Defines validation rules for user login (email and password)
 */
const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = loginSchema;
