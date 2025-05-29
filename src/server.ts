import app from './app';
import config from './config';
import { connectMongoDb } from './database';

const startServer = async () => {
  console.log();
  console.log('-------------------------------------');
  await connectMongoDb();

  app.listen(config.port, () => {
    console.log(`Express server running.`);
    console.log(`PORT: ${config.port}`);
    console.log(`ENVIRONMENT: ${config.env}`);
    console.log(`API Docs available at http://localhost:${config.port}/api-docs`);
    console.log('-------------------------------------');
    console.log();
  });
};

startServer();
