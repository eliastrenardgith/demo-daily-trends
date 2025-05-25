import { validate, ValidationError, } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validationMiddleware<T extends object>(dtoClass: new () => T) {
    return async (request: Request, response: Response, next: NextFunction) => {
        // Convert plain request payload to the DTO class defined by T.
        const dtoInstance: T = new dtoClass();

        Object.assign(dtoInstance, request.body);

        // Detect errors using class-validator.
        const errors: ValidationError[] = await validate(dtoInstance, {
            whitelist: true,       // Strip properties that are not defined in the DTO
            forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are sent
        });

        if (errors.length > 0) {
            const errorMessages = errors.flatMap(error =>
                Object.values(error.constraints || {})
            );
            console.log(`Error 400 for ${request.method} ${request.originalUrl}`);
            response.status(400).json(errorMessages);
        } else {

            // At this point the request payload is valid.
            // Use the validated DTO instance for the request payload, 
            // to include only the valid and whitelisted properties
            // defined by the DTO.
            request.body = dtoInstance;
            next();
        }
    };
}