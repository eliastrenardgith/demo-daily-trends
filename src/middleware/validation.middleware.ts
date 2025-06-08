import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export enum RequestPropertyNameEnum {
  params = 'params',
  query = 'query',
  body = 'body',
}

/**
 * Validates the URL parameters, in the request.
 *
 * @param dtoClass The DTO class that defines the URL parameters with class-validator.
 * @returns If is invalid, the response will be a 400 error. Otherwise continues with the next middleware.
 */
export function paramsMiddleware<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, RequestPropertyNameEnum.params);
}

/**
 * Validates the request body.
 *
 * @param dtoClass The DTO class that defines the request body with class-validator.
 * @returns If is invalid, the response will be a 400 error. Otherwise continues with the next middleware.
 */
export function bodyMiddleware<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, RequestPropertyNameEnum.body);
}

/**
 * Validates the request query parameters, like pagination.
 *
 * @param dtoClass The DTO class that defines the request query parameters with class-validator.
 * @returns If is invalid, the response will be a 400 error. Otherwise continues with the next middleware.
 */
export function queryMiddleware<T extends object>(dtoClass: new () => T) {
  return validationMiddleware(dtoClass, RequestPropertyNameEnum.query);
}

function validationMiddleware<T extends object>(dtoClass: new () => T, requestProp: RequestPropertyNameEnum) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const dtoInstance: T = new dtoClass();

    let requestPart: any = null;

    switch (requestProp) {
      case RequestPropertyNameEnum.body:
        requestPart = request.body;
        break;

      case RequestPropertyNameEnum.query:
        requestPart = request.query;
        break;

      case RequestPropertyNameEnum.params:
        requestPart = request.params;
        break;

      default:
        break;
    }

    Object.assign(dtoInstance, requestPart);

    // Detect errors using class-validator.
    const errors: ValidationError[] = await validate(dtoInstance, {
      whitelist: true, // Strip properties that are not defined in the DTO
      // forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are sent
    });

    if (errors.length > 0) {
      const errorMessages = errors.flatMap((error) => Object.values(error.constraints || {}));
      console.log(`Error 400 for ${request.method} ${request.originalUrl}`);
      response.status(400).json(errorMessages);
    } else {
      if (requestProp === RequestPropertyNameEnum.body) {
        // At this point the request payload is valid.
        // Use the validated DTO instance for the request payload,
        // to include only the valid and whitelisted properties
        // defined by the DTO.
        request.body = dtoInstance;
      }

      next();
    }
  };
}
