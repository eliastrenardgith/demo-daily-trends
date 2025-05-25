import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

// Middleware
app.use(express.json()); // Body parser for JSON requests

// TODO Add Swagger documentation.

// Catch-all for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Not Found' });
});

export default app;
