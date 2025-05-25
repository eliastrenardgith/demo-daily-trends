import app from './app';
import config from './config';

const startServer = async () => {
  app.listen(config.port, () => {
    console.log();
    console.log('-------------------------------------');
    console.log(`Express server running.`);
    console.log(`PORT: ${config.port}`);
    console.log(`ENVIRONMENT: ${config.env}`);
    console.log('-------------------------------------');
    console.log();
  });
};

startServer();