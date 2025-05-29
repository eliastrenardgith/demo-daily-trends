import express, { Application, Request, Response, NextFunction } from 'express';
import { feedRouter } from './routes/feed.routes';
import { finalErrorMiddleware } from './middleware/final-error.middleware';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import YAML from 'js-yaml';
import fs from 'fs';
import path from 'path';

const app: Application = express();

// Middleware
app.use(express.json()); // Body parser for JSON requests

app.use(requestLoggerMiddleware);

// Load Swagger documentation
const swaggerDocument: JsonObject = YAML.load(
  fs.readFileSync(path.resolve(__dirname, '../swagger/swagger.yaml'), 'utf8'),
) as JsonObject;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Application endpoints:
app.use('/api/feed', feedRouter);

// Catch-all for undefined routes
app.use((request: Request, response: Response) => {
  console.error(`Error 404 | ${request.method}: ${request.originalUrl}`);

  response.status(404).json({ message: 'Not Found' });
});

app.use(finalErrorMiddleware);

export default app;
