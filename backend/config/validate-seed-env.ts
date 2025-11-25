import * as Joi from 'joi';

const schema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
});

export function validateSeedEnv(env: NodeJS.ProcessEnv) {
  const { error, value } = schema.validate(env, {
    allowUnknown: true,
    abortEarly: false,
  });

  if (error) {
    throw new Error('Seed .env validation error: ' + error.message);
  }

  return value;
}
