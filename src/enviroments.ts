import * as Joi from 'joi';

export const enviroments = {
  dev: '.env',
  stag: '.stag.env',
  prod: '.prod.env',
};

export const validationSchema = Joi.object({
  PORT: Joi.number().default(3000),

  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_HOST: Joi.string().hostname().default('localhost'),

  PGADMIN_DEFAULT_EMAIL: Joi.string().email().required(),
  PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),

  API_KEY: Joi.string(),
});
