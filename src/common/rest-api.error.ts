export class RestApiError extends Error {
    /**
     * Response status.
     */
    statusCode: number;

    /**
     * Optional data for server side log. Not sent in the response.
     */
    data?: any;

    constructor(statusCode: number, message: string, data?: any) {
        super(message);

        this.statusCode = statusCode;
        this.data = data;

        Object.setPrototypeOf(this, RestApiError.prototype);
    }
}