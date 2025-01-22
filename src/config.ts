import { registerAs } from '@nestjs/config';

// Interface for type checking
interface DatabaseConfig {
  dbName: string;
  password: string;
  user: string;
  port: number;
  host: string;
  url?: string;
}

interface JwtConfig {
  secret: string;
  expiresIn: string;
}

interface AppConfig {
  nodeEnv: string;
  port: number;
  apiKey: string;
  cors: {
    enabled: boolean;
    origins: string[];
  };
}

// Configuration validation
const validateConfig = (config: Record<string, any>) => {
  const requiredEnvVars = [
    'POSTGRES_DB',
    'POSTGRES_PASSWORD',
    'POSTGRES_USER',
    'POSTGRES_HOST',
    'JWT_SECRET',
  ];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  }

  return config;
};

export default registerAs('config', () => {
  const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    apiKey: process.env.API_KEY,

    postgres: {
      dbName: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      host: process.env.POSTGRES_HOST,
      // Optional: construct URL if needed
      url: process.env.DATABASE_URL || `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    } as DatabaseConfig,

    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    } as JwtConfig,

    cors: {
      enabled: process.env.CORS_ENABLED === 'true',
      origins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
    },
  };

  return validateConfig(config);
});
