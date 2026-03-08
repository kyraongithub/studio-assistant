import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

export const env = {
  PORT: process.env.PORT || 3001,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
};

if (!env.OPENAI_API_KEY) {
  console.warn('WARNING: OPENAI_API_KEY is not defined in environment variables.');
}
