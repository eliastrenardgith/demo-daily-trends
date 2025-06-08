import { NextFunction, Request, Response } from 'express';
import { RestApiError } from '../common/rest-api.error';

/**
 * Final error middleware.
 *
 * @param error
 * @param request
 * @param response
 * @param _next
 * @returns
 */
export function finalErrorMiddleware(error: any, request: Request, response: Response, _next: NextFunction): void {
  const errorMessage: string = 'Internal Server Error.';

  console.log(errorMessage, error);

  if (error instanceof RestApiError) {
    error.data && console.log('Error data: ', error);
  }

  if (error.statusCode) {
    response.status(error.statusCode).json({
      message: error.message,
    });

    return;
  }

  // Always response error 500 in case of non controlled exceptions.
  response.status(500).json({ message: errorMessage });
}
