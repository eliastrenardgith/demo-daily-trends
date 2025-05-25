import { NextFunction, Request, Response } from "express";

export function requestLoggerMiddleware(request: Request, response: Response, next: NextFunction): void {
    const timestamp: string = (new Date).toISOString();
    const { method, originalUrl } = request;

    // Add more information to the log for debug purposes.
    console.log(`${timestamp} | ${method} ${originalUrl}`);

    next();
}