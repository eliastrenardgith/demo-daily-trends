import dotenv from 'dotenv';
import path from 'path';

// Load the environment variables.
const envPath = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'local'}`);
dotenv.config({ path: envPath });

// console.log(`Environment vars: ${JSON.stringify(process.env)}`);

const mongoDbServerUri: string = process.env.MONGODB_SERVER_URI || `localhost:27017`;
const mongoDbUser: string | undefined = process.env.MONGODB_USER;
const mongoDbPassword: string | undefined = process.env.MONGODB_PASSWORD;

// console.log(`Loaded env vars: ${JSON.stringify({ mongoDbServerUri, mongoDbUser, mongoDbPassword })}`);

const finalMongoDbUri: string =
  mongoDbUser && mongoDbPassword
    ? `${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${mongoDbServerUri}/${process.env.MONGODB_DB_NAME}`
    : `${mongoDbServerUri}/${process.env.MONGODB_DB_NAME}`;

// Global configuration object.
const config = {
  env: process.env.NODE_ENV || 'local',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  mongo: {
    uri: `mongodb://${finalMongoDbUri}?authSource=admin`,
  },
  feed: {
    maxNewsCount: process.env.FEED_MAX_NEWS_COUNT ? parseInt(process.env.FEED_MAX_NEWS_COUNT) : 5,
  },
};

export default config;
