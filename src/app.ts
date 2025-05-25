import express, { Application, Request, Response, NextFunction } from 'express';
import { feedRouter } from './routes/feed.routes';
import { finalErrorMiddleware } from './middleware/final-error.middleware';
import { requestLoggerMiddleware } from './middleware/request-logger.middleware';

const app: Application = express();

// Middleware
app.use(express.json()); // Body parser for JSON requests

app.use(requestLoggerMiddleware);

// TODO Add Swagger documentation.

// Application endpoints:
app.use('/api/feed', feedRouter);

// Catch-all for undefined routes
app.use((request: Request, response: Response) => {
  console.error(`Error 404 | ${request.method}: ${request.originalUrl}`);

  response.status(404).json({ message: 'Not Found' });
});

app.use(finalErrorMiddleware)

export default app;
