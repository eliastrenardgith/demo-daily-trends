import app from './app';
import config from './config';

const startServer = async () => {
  app.listen(config.port, () => {
    console.log(`Express server running. ${JSON.stringify({
        port: config.port,
        environment: config.env
    })}`);
  });
};

startServer();