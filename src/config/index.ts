import dotenv from 'dotenv';
import path from 'path';

// Load the environment variables.
const envPath = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'local'}`);
dotenv.config({ path: envPath });

const mongoDbServerUri = process.env.MONGO_SERVER_URI || `mongodb://localhost:27017`;

// Global configuration object.
const config = {
    env: process.env.NODE_ENV || 'local',
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    mongo: {
        uri: `${mongoDbServerUri}/${process.env.MONGODB_DB_NAME}`,
    }
};

export default config;